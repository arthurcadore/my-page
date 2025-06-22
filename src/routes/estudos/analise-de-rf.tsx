import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Clipboard, Check, Code as CodeIcon } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { BlockMath, InlineMath } from 'react-katex'
import signalAttenuationPlot from '../../assets/signal_attenuation.png'
import heatmapPlot from '../../assets/heatmap_overlay2.png'
import { useState } from 'react'

const CodeBlock = ({ codeString }: { codeString: string }) => {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString)
    setHasCopied(true)
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }

  return (
    <div className="relative group">
      <pre className="my-4 rounded-md bg-gray-800 p-4 pr-12 text-sm text-gray-100 overflow-x-auto">
        <code>{codeString}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 p-1.5 rounded-md bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
        aria-label="Copiar código"
      >
        {hasCopied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Clipboard className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}

export const Route = createFileRoute('/estudos/analise-de-rf')({
  component: AnaliseDeRf,
})

function AnaliseDeRf() {
  const [isScriptVisible, setIsScriptVisible] = useState(false)
  
  const fullScript = `import cv2
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import Normalize
from skimage.draw import line
from tqdm import tqdm
import argparse

# === CONFIGURAÇÕES ===
IMAGE_PATH = "plant.png"
FREQ_GHZ = 5.0
TX_POWER_DBM = 20
NOISE_FLOOR_DBM = -100
PATH_LOSS_EXPONENT = 3.0
METERS_PER_PIXEL = 0.005
WALL_ATTENUATION_DB = 5.0
USE_MANUAL_ORIGIN = False
MANUAL_ORIGIN = (300, 280)

# === FUNÇÕES ===
def find_origin(image, target_color=(0, 0, 0)):
    """Localiza o primeiro pixel com a cor alvo."""
    mask = cv2.inRange(image, np.array(target_color), np.array(target_color))
    coords = cv2.findNonZero(mask)
    if coords is not None:
        return tuple(coords[0][0])
    return None

def count_walls_on_path(img, origin, target):
    """Conta quantas paredes (pixels pretos) existem na linha de visão."""
    rr, cc = line(origin[1], origin[0], target[1], target[0])
    wall_crossings = 0
    currently_in_wall = False
    for i in range(1, len(rr)):
        y, x = rr[i], cc[i]
        is_wall = np.all(img[y, x] == 0)
        if is_wall and not currently_in_wall:
            wall_crossings += 1
            currently_in_wall = True
        elif not is_wall:
            currently_in_wall = False
    return wall_crossings

def compute_signal_strength_map(image, origin, tx_power_dbm, path_loss_exp, freq_ghz):
    """Gera o mapa de calor de potência do sinal."""
    height, width = image.shape[:2]
    heatmap = np.full((height, width), NOISE_FLOOR_DBM, dtype=np.float32)

    freq_hz = freq_ghz * 1e9
    c = 3e8
    lambda_m = c / freq_hz
    fspl_at_1m = 20 * np.log10(4 * np.pi / lambda_m)

    for y in tqdm(range(height), desc="Calculando Heatmap"):
        for x in range(width):
            if np.all(image[y, x] == 0) and (x, y) != origin:
                continue

            num_walls = count_walls_on_path(image, origin, (x, y))
            wall_attenuation = num_walls * WALL_ATTENUATION_DB

            distance_in_meters = np.hypot(x - origin[0], y - origin[1]) * METERS_PER_PIXEL
            
            if distance_in_meters == 0:
                rx_power = tx_power_dbm
            else:
                path_loss = fspl_at_1m + 10 * path_loss_exp * np.log10(distance_in_meters)
                rx_power = tx_power_dbm - path_loss - wall_attenuation
            
            heatmap[y, x] = max(NOISE_FLOOR_DBM, rx_power)

    return heatmap

def show_heatmap_overlay(image, heatmap, origin, vmin=-100, vmax=0, alpha=0.5, save_path=None):
    """Exibe e opcionalmente salva o heatmap sobreposto à imagem."""
    norm = Normalize(vmin=vmin, vmax=vmax)
    norm_heatmap = norm(heatmap)

    cmap = plt.get_cmap('jet')
    color_map = cmap(norm_heatmap)[:, :, :3]
    color_map = (color_map * 255).astype(np.uint8)
    overlay = cv2.addWeighted(image, 1 - alpha, color_map, alpha, 0)

    cv2.circle(overlay, origin, radius=5, color=(255, 0, 0), thickness=-1)

    fig, ax = plt.subplots(figsize=(16, 9))
    im = ax.imshow(overlay)
    ax.axis("off")
    plt.tight_layout()

    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches='tight')
        print(f"Heatmap salvo em: {save_path}")

    plt.show()

def main():
    """Função principal para executar a simulação."""
    img = cv2.imread(IMAGE_PATH)
    if img is None:
        raise FileNotFoundError(f"Imagem não encontrada: {IMAGE_PATH}")
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    if USE_MANUAL_ORIGIN:
        origin = MANUAL_ORIGIN
    else:
        height, width, _ = img_rgb.shape
        origin = (width // 2, height // 2)

    print(f"Calculando heatmap com origem em: {origin}")
    heatmap = compute_signal_strength_map(img_rgb, origin, TX_POWER_DBM, PATH_LOSS_EXPONENT, FREQ_GHZ)
    
    print("Exibindo resultado...")
    show_heatmap_overlay(img_rgb, heatmap, origin, save_path="heatmap_overlay.png")
    print("Script concluído.")

if __name__ == '__main__':
    main()
`

  return (
    <div className="font-serif bg-white">
      <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto flex items-center px-8 py-5">
          <Link
            to="/estudos"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border bg-white shadow-sm transition-colors hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="ml-5 text-3xl font-light text-gray-800">
            Análise de Propagação de RF: Heatmap em Ambientes Internos
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-8 py-10">
        <div className="prose prose-lg max-w-none text-gray-800">
          <p>
            A predição da cobertura de sinal de rádio frequência (RF) é um pilar
            fundamental no projeto de redes sem fio. Este artigo detalha, passo
            a passo, a teoria matemática e a implementação em Python para gerar
            mapas de calor (heatmaps) de intensidade de sinal, transformando uma
            planta baixa em um mapa de cobertura visual.
          </p>

          <h2 className="mt-12 text-2xl font-semibold border-b pb-2">
            Configuração dos Parâmetros de Simulação
          </h2>
          <p>
            Antes de iniciar os cálculos, definimos os parâmetros fundamentais
            que caracterizam o ambiente e o sistema de transmissão:
          </p>
          <CodeBlock
            codeString={`# Parâmetros do Sistema
FREQ_GHZ = 5.0                    # Frequência em GHz (banda WiFi 5GHz)
TX_POWER_DBM = 20                 # Potência de transmissão em dBm
NOISE_FLOOR_DBM = -100            # Piso de ruído (limite mínimo)
PATH_LOSS_EXPONENT = 3.0          # Expoente de perda (2.0=espaço livre, >2=interior)
WALL_ATTENUATION_DB = 5.0         # Atenuação por parede em dB
METERS_PER_PIXEL = 0.005          # Escala: 1 pixel = 5mm`}
          />

          <h2 className="mt-12 text-2xl font-semibold border-b pb-2">
            Fundamentos Teóricos e Implementação
          </h2>

          <h3 className="mt-8 text-xl font-semibold">
            1. Perda em Espaço Livre (Free Space Path Loss - FSPL)
          </h3>
          <p>
            Todo sinal de RF enfraquece naturalmente ao viajar pelo espaço. O
            FSPL é o modelo base que quantifica essa perda em um ambiente ideal,
            sem obstáculos. A fórmula depende da frequência (<InlineMath math="f" />
            ) e da distância (<InlineMath math="d" />).
          </p>
          <BlockMath math="FSPL(dB) = 20 \log_{10}(d) + 20 \log_{10}(f) + 20 \log_{10}\left(\frac{4\pi}{c}\right)" />
          <p>
            No script, calculamos um valor de referência para uma distância de 1
            metro, que servirá de base para o modelo mais complexo.
          </p>
          <CodeBlock
            codeString={`# FSPL a 1 metro (distância de referência d0)
c = 3e8  # Velocidade da luz
freq_hz = FREQ_GHZ * 1e9
lambda_m = c / freq_hz
fspl_at_1m = 20 * np.log10(4 * np.pi / lambda_m)`}
          />

          <h3 className="mt-8 text-xl font-semibold">
            2. Modelo Log-Distance para Ambientes Internos
          </h3>
          <p>
            Dentro de edifícios, o sinal não se propaga livremente. O modelo
            Log-Distance aprimora o FSPL ao introduzir o Expoente de Perda de
            Caminho (<InlineMath math="n" />
            ). Um valor de <InlineMath math="n > 2" /> indica que o sinal se
            atenua mais rapidamente do que no espaço livre, devido a reflexões,
            difração e absorção.
          </p>
          <BlockMath math="PL(d) = PL(d_0) + 10 \cdot n \cdot \log_{10}\left(\frac{d}{d_0}\right)" />
          <p>O código implementa esta fórmula para calcular a perda de caminho baseada na distância.</p>
          <CodeBlock
            codeString={`# Perda de caminho usando o expoente 'n'
path_loss = fspl_at_1m + 10 * PATH_LOSS_EXPONENT * np.log10(distance_meters)`}
          />

          <h3 className="mt-8 text-xl font-semibold">3. Modelagem da Atenuação de Obstáculos</h3>
          <p>
            A principal fonte de perda em ambientes internos são as paredes.
            Modelamos este efeito calculando uma penalidade de atenuação para
            cada parede que o sinal cruza.
          </p>
          <BlockMath math="A_{\text{paredes}} = N_{\text{paredes}} \cdot \text{Atenuação}_{\text{por parede}}" />
          <p>
            Para encontrar <InlineMath math="N_{\text{paredes}}" />, o script traça uma
            linha de visão da origem a cada pixel e conta as interseções com
            pixels pretos (paredes).
          </p>
          <CodeBlock
            codeString={`def count_walls_on_path(img, origin, target):
    rr, cc = line(origin[1], origin[0], target[1], target[0])
    wall_crossings = 0
    currently_in_wall = False
    for i in range(1, len(rr)):
        y, x = rr[i], cc[i]
        is_wall = np.all(img[y, x] == 0)
        if is_wall and not currently_in_wall:
            wall_crossings += 1
            currently_in_wall = True
        elif not is_wall:
            currently_in_wall = False
    return wall_crossings`}
          />
          <div className="my-6">
            <img
              src={signalAttenuationPlot}
              alt="Gráfico de Atenuação de Sinal por Distância"
              className="rounded-lg shadow-md border border-gray-200 w-full"
            />
            <p className="text-center text-sm text-gray-600 mt-2">
              Ilustração do modelo: O sinal decai com a distância (curva suave)
              e sofre quedas abruptas (degraus) ao cruzar paredes.
            </p>
          </div>
          
          <h3 className="mt-8 text-xl font-semibold">4. Cálculo Final da Potência Recebida</h3>
          <p>
            A potência final em qualquer ponto é a potência de transmissão
            original, subtraída de todas as perdas calculadas: a perda pela
            distância (Log-Distance) e a perda pelas paredes.
          </p>
          <BlockMath math="P_{Rx} = P_{Tx} - (PL(d) + A_{\text{paredes}})" />
          <p>No loop principal, esta é a linha que une toda a teoria:</p>
          <CodeBlock
            codeString={`# Potência recebida é a transmitida menos a perda total
wall_loss = num_walls * WALL_ATTENUATION_DB
rx_power = TX_POWER_DBM - (path_loss + wall_loss)`}
          />

          <h2 className="mt-12 text-2xl font-semibold border-b pb-2">
            Implementação Detalhada: Funções Auxiliares
          </h2>

          <h3 className="mt-8 text-xl font-semibold">Localização Automática da Origem</h3>
          <p>
            O script pode localizar automaticamente o ponto de origem (transmissor)
            procurando por pixels pretos na imagem, ou usar coordenadas manuais.
          </p>
          <CodeBlock
            codeString={`def find_origin(image, target_color=(0, 0, 0)):
    mask = cv2.inRange(image, np.array(target_color), np.array(target_color))
    coords = cv2.findNonZero(mask)
    if coords is not None:
        return tuple(coords[0][0])  # (x, y)
    return None`}
          />

          <h3 className="mt-8 text-xl font-semibold">Verificação de Bloqueio de Linha de Visão</h3>
          <p>
            Uma função auxiliar verifica se existe bloqueio total entre dois pontos,
            útil para otimizações ou análises específicas.
          </p>
          <CodeBlock
            codeString={`def is_blocked(img, origin, target):
    rr, cc = line(origin[1], origin[0], target[1], target[0])
    for i in range(1, len(rr)):
        y, x = rr[i], cc[i]
        if np.all(img[y, x] == 0):
            return True
    return False`}
          />

          <h3 className="mt-8 text-xl font-semibold">Tratamento de Casos Especiais</h3>
          <p>
            O script inclui otimizações importantes para casos especiais:
          </p>
          <ul>
            <li><strong>Piso de Ruído:</strong> Valores abaixo de <InlineMath math="-100" /> dBm são limitados</li>
            <li><strong>Ponto de Origem:</strong> Quando <InlineMath math="d = 0" />, a potência recebida é igual à transmitida</li>
            <li><strong>Pixels de Parede:</strong> São ignorados no cálculo, exceto o ponto de origem</li>
          </ul>
          <CodeBlock
            codeString={`# Inicialização com piso de ruído
heatmap = np.full((height, width), NOISE_FLOOR_DBM, dtype=np.float32)

# Caso especial: ponto de origem
if distance_in_meters == 0:
    rx_power = tx_power_dbm
else:
    # Cálculo normal da perda de caminho
    path_loss = fspl_at_1m + 10 * path_loss_exp * np.log10(distance_in_meters)
    rx_power = tx_power_dbm - path_loss - wall_attenuation

# Limitação ao piso de ruído
heatmap[y, x] = max(NOISE_FLOOR_DBM, rx_power)`}
          />

          <h2 className="mt-12 text-2xl font-semibold border-b pb-2">
            Visualização e Sobreposição do Heatmap
          </h2>
          <p>
            A função de visualização converte os valores de potência em cores e
            sobrepõe o resultado à planta baixa original, criando uma representação
            visual intuitiva da cobertura.
          </p>
          <CodeBlock
            codeString={`def show_heatmap_overlay(image, heatmap, origin, vmin=-100, vmax=0, alpha=0.5):
    # Normalização dos valores para o intervalo [0,1]
    norm = Normalize(vmin=vmin, vmax=vmax)
    norm_heatmap = norm(heatmap)
    
    # Conversão para mapa de cores
    cmap = plt.get_cmap('jet')
    color_map = cmap(norm_heatmap)[:, :, :3]
    color_map = (color_map * 255).astype(np.uint8)
    
    # Sobreposição com transparência
    overlay = cv2.addWeighted(image, 1 - alpha, color_map, alpha, 0)
    
    # Marcação do ponto de origem
    cv2.circle(overlay, origin, radius=5, color=(255, 0, 0), thickness=-1)
    
    return overlay`}
          />

          <h2 className="mt-12 text-2xl font-semibold border-b pb-2">
            Resultado da Simulação: Heatmap de Cobertura
          </h2>
          <p className="mt-4">
            Ao executar este cálculo para todos os pixels da planta baixa,
            geramos uma matriz de valores de potência. Esta matriz é então
            mapeada para uma escala de cores e sobreposta à planta original,
            resultando no heatmap de cobertura final. Cores quentes (vermelho)
            indicam sinal forte, enquanto cores frias (azul) indicam sinal
            fraco ou ausente.
          </p>
          <div className="my-6 rounded-lg border border-gray-300 p-4 shadow-sm transition-all">
            <img
              src={heatmapPlot}
              alt="Heatmap de Propagação de Sinal"
              className="rounded-lg border border-gray-200 w-full"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsScriptVisible(!isScriptVisible)}
                className="flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-colors"
              >
                <CodeIcon className="h-4 w-4" />
                <span>
                  {isScriptVisible ? 'Ocultar Script' : 'Ver Script Completo'}
                </span>
              </button>
            </div>

            {isScriptVisible && (
              <div className="mt-4">
                <CodeBlock codeString={fullScript} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 