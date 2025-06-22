import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Clipboard, Check } from 'lucide-react'
import 'katex/dist/katex.min.css'
import { useState } from 'react'

const CodeBlock = ({
  codeString,
  lang,
}: {
  codeString: string
  lang?: string
}) => {
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
        <code className={`language-${lang}`}>{codeString}</code>
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

export const Route = createFileRoute('/estudos/infraestrutura-com-ansible')({
  component: InfraestruturaComAnsible,
})

function InfraestruturaComAnsible() {
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
              Automação de Infraestrutura com Ansible
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-8 py-10">
        <div className="prose prose-lg max-w-none text-gray-800">
          <h2 className="text-2xl font-semibold border-b pb-2">Objetivo</h2>
          <p>
            O objetivo deste documento é apresentar um guia de configuração e
            atualização em massa de dispositivos Intelbras utilizando Ansible.
          </p>

          <h2 className="mt-12 text-2xl font-semibold border-b pb-2">
            Versionamento
          </h2>
          <p>
            Neste documento, foram utilizadas as seguintes versões de software
            para receber arquivos de configuração de maneira automatizada e
            realizar atualização de firmware em massa.
          </p>

          <h3 className="mt-8 text-xl font-semibold">Versão dos Switches</h3>
          <CodeBlock
            lang="conf"
            codeString={`INTELBRAS OS Software, Version 7.1.070, Release 1124
Copyright (C) 2023 Intelbras S.A. All rights reserved.
INTELBRAS SC 3570-24GP-4X uptime is 0 weeks, 0 days, 0 hours, 31 minutes
Last reboot reason : User reboot
 
Boot image: flash:/sc3570-ibos710-boot-r1124.bin
Boot image version: 7.1.070, Release 1124
  Compiled Oct 25 2023 11:00:00
System image: flash:/sc3570-ibos710-system-r1124.bin
System image version: 7.1.070, Release 1124
  Compiled Oct 25 2023 11:00:00`}
          />

          <h3 className="mt-8 text-xl font-semibold">Versão do Repositório</h3>
          <CodeBlock
            lang="conf"
            codeString={`https://github.com/arthurcadore/autoconfig-comware/releases/tag/v1.0.0`}
          />
          
          <h2 className="mt-12 text-2xl font-semibold border-b pb-2">
            Arquitetura de Microserviços
          </h2>
          <p>
            A solução é implementada utilizando uma arquitetura de microserviços orquestrada com Docker Compose. Essa abordagem isola as responsabilidades em contêineres distintos, garantindo modularidade e escalabilidade. Os principais serviços são:
          </p>
          <ul>
            <li><strong>dhcpserver:</strong> Responsável por atribuir endereços IP aos dispositivos na rede. Para o ZTP, ele é configurado para fornecer opções adicionais que informam ao dispositivo onde encontrar seu arquivo de configuração inicial.</li>
            <li><strong>tftpserver:</strong> Um servidor TFTP (Trivial File Transfer Protocol) que hospeda os arquivos de configuração (`.cfg`) e as imagens de firmware (`.ipe`). Os dispositivos baixam seus arquivos de configuração deste servidor durante o processo de boot.</li>
            <li><strong>ansible:</strong> O contêiner principal que contém o Ansible e os playbooks. Uma vez que um dispositivo obtém sua configuração inicial e está acessível na rede, este serviço se conecta a ele via SSH para executar tarefas de configuração, atualização e gerenciamento em massa.</li>
          </ul>

          <h2 className="mt-12 text-2xl font-semibold border-b pb-2">
            Configuração Inicial Automatizada (ZTP)
          </h2>
          <p>
            Para a atualização automatizada é necessário estabelecer uma
            configuração inicial com os devices para que o Ansible possa
            acessá-los e aplicar alterações. Esse processo, chamado de ZTP
            (Zero Touch Provisioning), não pode necessitar de intervenção manual.
          </p>

          <h3 className="mt-8 text-xl font-semibold">
            Criação dos arquivos de startup.cfg
          </h3>
          <p>
            Exemplo de arquivo `startup.cfg` para um switch Intelbras S3328G-A:
          </p>
          <CodeBlock
            lang="conf"
            codeString={`system-view
sysname S3328G-A
lldp global enable
stp mode pvst
vlan 1
description VLAN-1-MANAGEMENT
quit
interface Vlan-interface 1
ip address dhcp-alloc
quit
ip route-static 0.0.0.0 0 10.100.73.1
dns server 8.8.8.8
snmp-agent
snmp-agent community intelbras123 user-role network-admin
local-user ped class manage
 password simple Admin@1234
 authorization-attribute user-role network-admin
 service-type telnet http https pad ssh terminal
quit
ssh server enable
ssh user ped service-type all authentication-type password
save force`}
          />

          <h3 className="mt-8 text-xl font-semibold">
            Configuração do DHCP-Server
          </h3>
          <CodeBlock
            lang="conf"
            codeString={`option domain-name "devremp.intelbras.com.br";
option domain-name-servers 8.8.8.8;
option tftp-server-address 10.100.73.8;
option routers 10.100.73.1;
option subnet-mask 255.255.255.0;

subnet 10.100.73.0 netmask 255.255.255.0 {
  range 10.100.73.230 10.100.73.254;
  option routers 10.100.73.1;
}

host device52 {
  hardware ethernet 7C:7A:3C:53:D5:9F;
  fixed-address 10.100.73.52;
  option bootfile-name "S3328G-A.cfg";
}`}
          />

          <h3 className="mt-8 text-xl font-semibold">
            Logs de Leases de DHCP
          </h3>
          <CodeBlock
            lang="conf"
            codeString={`dhcpserver  | DHCPDISCOVER from 58:ca:ac:95:f1:80 via ens18
dhcpserver  | DHCPOFFER on 10.100.73.99 to 58:ca:ac:95:f1:80 via ens18
dhcpserver  | DHCPREQUEST for 10.100.73.99 (10.100.73.8) from 58:ca:ac:95:f1:80 via ens18
dhcpserver  | DHCPACK on 10.100.73.99 to 58:ca:ac:95:f1:80 via ens18`}
          />

          <h3 className="mt-8 text-xl font-semibold">
            Logs de Configuração no produto
          </h3>
          <CodeBlock
            lang="conf"
            codeString={`System is starting...
Startup configuration file doesnt exist or is invalid.
Performing automatic configuration... Press CTRL_C or CTRL_D to break.
Automatic configuration attempt: 2.
Interface used: Vlan-interface1.
Obtained an IP address for Vlan-interface1: 10.100.73.99.
Obtained configuration file name AP-3622.cfg and TFTP server IP address 10.100.73.8.
Successfully downloaded file AP-3622.cfg.
Executing the configuration file. Please wait...
Automatic configuration successfully completed.
<AP-3622>`}
          />

          <h2 className="mt-12 text-2xl font-semibold border-b pb-2">
            Atualização Automatizada com Ansible
          </h2>
          <h3 className="mt-8 text-xl font-semibold">
            Verificando Compatibilidade NETCONF
          </h3>
          <CodeBlock
            lang="xml"
            codeString={`<?xml version="1.0" encoding="UTF-8"?>
<hello xmlns="urn:ietf:params:xml:ns:netconf:base:1.0">
	<capabilities>
		<capability>urn:ietf:params:netconf:base:1.0</capability>
		<capability>urn:ietf:params:netconf:capability:writable-running:1.0</capability>
		<!-- ... -->
	</capabilities>
	<session-id>2</session-id>
</hello>`}
          />

          <h3 className="mt-8 text-xl font-semibold">
            Edição do arquivo `namespaces.py`
          </h3>
          <CodeBlock
            lang="py"
            codeString={`NCDATA = 'http://www.intelbras.com/netconf/data:1.0'
NCCONFIG = "http://www.intelbras.com/netconf/config:1.0"
NCACTION = "http://www.intelbras.com/netconf/action:1.0"`}
          />

          <h3 className="mt-8 text-xl font-semibold">
            Configurando Inventário de Hosts
          </h3>
          <p>
            O inventário do Ansible é um arquivo (geralmente em formato INI ou YAML) que define os dispositivos que o Ansible irá gerenciar. Ele é o coração do gerenciamento de configuração, pois agrupa os hosts e associa variáveis a eles, como credenciais de acesso.
          </p>
          <p>
            No exemplo abaixo, criamos dois grupos: `switches` e `accesspoints`. Cada host (como `sw1` ou `ap1`) possui variáveis específicas (`username` e `password`) que o playbook utilizará para autenticar via SSH.
          </p>
          <CodeBlock
            lang="yaml"
            codeString={`all:
  children:
    switches:
      hosts:
        sw1:
          username: ansible
          password: capacitapass#123`}
          />

          <h3 className="mt-8 text-xl font-semibold">
            Configurando Playbook de Atualização
          </h3>
          <p>
            O playbook é um arquivo YAML que descreve uma série de tarefas a serem executadas em um ou mais hosts do inventário. Ele é o roteiro que o Ansible segue para automatizar um processo.
          </p>
          <p>
            Este playbook de atualização de firmware é dividido em três tarefas principais:
          </p>
          <ul>
            <li><strong>Habilitar FTP:</strong> Utiliza o módulo `comware_ftp` para garantir que o serviço de FTP esteja ativo no dispositivo, permitindo a transferência de arquivos.</li>
            <li><strong>Baixar Firmware:</strong> A tarefa mais crítica, usa o módulo `comware_file_copy` para transferir a imagem de firmware do servidor Ansible para a memória flash do dispositivo.</li>
            <li><strong>Reiniciar o Dispositivo:</strong> Após a transferência, o módulo `comware_reboot` é chamado para reiniciar o switch, que então inicializará com a nova versão de firmware.</li>
          </ul>
          <p>
            A diretiva `ignore_errors: yes` é usada para garantir que o playbook continue para o próximo dispositivo mesmo que uma tarefa falhe em um deles.
          </p>
          <CodeBlock
            lang="yaml"
            codeString={`- name: Firmware Upgrade
  hosts: all
  gather_facts: no
  connection: local
  tasks:
    - name: Download firmware
      comware_file_copy:
        # ...
        file: "/ansible/shared/SC3570-IBOS710-A1122P02.ipe"
        remote_path: "flash:/SC3570-IBOS710-A1122P02.ipe"
      ignore_errors: yes

    - name: Reboot device
      comware_reboot:
        reboot: true
        # ...
      ignore_errors: yes`}
          />

          <h3 className="mt-8 text-xl font-semibold">
            Verificando a versão após atualização
          </h3>
          <CodeBlock
            lang="conf"
            codeString={`<SC-3570-48S-6X>display version
INTELBRAS OS Software, Version 7.1.070, Release A1122P02`}
          />

          <h2 className="mt-12 text-2xl font-semibold border-b pb-2">
            Debugging de Acesso
          </h2>
          <CodeBlock
            lang="conf"
            codeString={`<SC-3570-48S-6X>>debugging ssh server all
*Sep  2 11:11:14:527 2024 SC-3570-48S-6X> SSHS/6/SSHS_AUTH_PWD_FAIL: Authentication failed for user admin ...`}
          />
        </div>
      </div>
    </div>
  )
}