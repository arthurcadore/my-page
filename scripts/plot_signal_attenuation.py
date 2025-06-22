import numpy as np
import matplotlib.pyplot as plt
import scienceplots

# === Parâmetros de Simulação ===
MAX_DISTANCE_METERS = 30
TX_POWER_DBM = 0
FREQ_GHZ = 5.0
PATH_LOSS_EXPONENT = 2.8
WALL_LOCATIONS = [10, 20]
WALL_ATTENUATION_DB = 4

# === Estilo científico ===
plt.style.use(['science', 'notebook'])
plt.rcParams['figure.figsize'] = (12, 8)

# === Função de cálculo de perda de caminho (Log-Distance Model) ===
def calculate_rx_power(distance_meters, num_walls):
    if distance_meters <= 0:
        return TX_POWER_DBM
    
    c = 3e8
    freq_hz = FREQ_GHZ * 1e9
    lambda_m = c / freq_hz
    
    # FSPL a 1 metro (distância de referência d0)
    fspl_at_1m = 20 * np.log10(4 * np.pi * 1 / lambda_m)
    
    # Perda de caminho usando o expoente
    path_loss = fspl_at_1m + 10 * PATH_LOSS_EXPONENT * np.log10(distance_meters)
    
    wall_loss = num_walls * WALL_ATTENUATION_DB
    
    return TX_POWER_DBM - (path_loss + wall_loss)

# === Geração de Dados ===
distances = np.linspace(0.1, MAX_DISTANCE_METERS, 1000)
signal_strengths = [
    calculate_rx_power(d, sum(1 for w in WALL_LOCATIONS if d >= w))
    for d in distances
]

# === Gráfico ===
fig, ax = plt.subplots()

ax.plot(distances, signal_strengths, label='Potência do Sinal', color='royalblue', linewidth=2)

# Paredes verticais e anotações
for i, wall_pos in enumerate(WALL_LOCATIONS):
    label = f'Parede ({WALL_ATTENUATION_DB} dB)' if i == 0 else "_nolegend_"
    ax.axvline(x=wall_pos, color='crimson', linestyle='--', linewidth=1.5, label=label)
    
    idx_after = np.where(distances >= wall_pos)[0][0]
    power_after = signal_strengths[idx_after]

    ax.annotate(f'-{WALL_ATTENUATION_DB} dB',
                xy=(wall_pos, power_after),
                xytext=(wall_pos + 1.5, power_after - 15),
                arrowprops=dict(arrowstyle="->", connectionstyle="arc3,rad=0.2", color='black'),
                fontsize=10,
                bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="black", lw=0.5, alpha=0.7))

# Configurações do gráfico
ax.set_xlabel("Distância (m)")
ax.set_ylabel("Potência Recebida (dBm)")
ax.set_title("Atenuação de Sinal com Barreiras (Modelo Log-Distance)")
ax.set_xlim(0, MAX_DISTANCE_METERS)
ax.set_ylim(-100, TX_POWER_DBM + 5)
ax.grid(True)
ax.legend()

# --- Salvar o Gráfico ---
output_path = 'src/assets/signal_attenuation_plot.png'
plt.savefig(output_path, dpi=300, bbox_inches='tight')
print(f"Gráfico salvo em: {output_path}")

plt.show()
