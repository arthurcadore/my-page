import { createFileRoute } from '@tanstack/react-router'
import { Github, Dock, Copy, Check } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/software')({
  component: Software,
})

function Software() {
  const academicos = [
    {
      title: 'eng-telecom-workbook',
      description:
        'This repository is dedicated to all homeworks and projects developed during the Telecom Engineering course at IFSC.',
      url: 'https://github.com/arthurcadore/eng-telecom-workbook',
    },
    {
      title: 'typst-intelbras',
      description:
        "This repository is dedicated to Typst's Template for Intelbras's Reports.",
      url: 'https://github.com/arthurcadore/typst-intelbras',
    },
    {
      title: 'my-scripts',
      description: 'A repository for personal and utility scripts.',
      url: 'https://github.com/arthurcadore/my-scripts',
    },
  ]

  const devops = [
    {
      title: 'network-captures',
      description: 'Repository for network capture files and analysis.',
      url: 'https://github.com/arthurcadore/network-captures',
    },
    {
      title: 'ansible-comware',
      description: 'Ansible scripts for HPE Comware devices.',
      url: 'https://github.com/arthurcadore/ansible-comware',
    },
    {
      title: '(Docker) ansible-comware',
      description: 'Docker image for Ansible with HPE Comware support.',
      url: 'https://hub.docker.com/r/arthurcadore/ansible-comware',
      type: 'docker',
    },
    {
      title: 'puppet-comware',
      description: 'Puppet manifests for HPE Comware devices.',
      url: 'https://github.com/arthurcadore/puppet-comware',
    },
    {
      title: ' (Docker) puppet-comware',
      description: 'Docker image for Puppet with HPE Comware support.',
      url: 'https://hub.docker.com/r/arthurcadore/puppet-comware',
      type: 'docker',
    },
    {
      title: 'snmpwalker',
      description: 'A tool to perform SNMP walks on network devices.',
      url: 'https://github.com/arthurcadore/snmpwalker',
    },
    {
      title: 'open-sflowdump',
      description: 'A tool to dump and analyze sFlow data.',
      url: 'https://github.com/arthurcadore/open-sflowdump',
    },
    {
      title: 'monitoring-templates',
      description: 'Templates for monitoring systems like Zabbix or Grafana.',
      url: 'https://github.com/arthurcadore/monitoring-templates',
    },
    {
      title: 'wireshark-dissector-plugins',
      description: 'Custom Wireshark dissector plugins.',
      url: 'https://github.com/arthurcadore/wireshark-dissector-plugins',
    },
  ]

  const appliances = [
    {
      title: 'zbx-grafana-appliance',
      description: 'A Zabbix and Grafana appliance using Docker.',
      url: 'https://github.com/arthurcadore/zbx-grafana-appliance',
    },
    {
      title: 'syslog-appliance',
      description: 'A syslog server appliance using Docker.',
      url: 'https://github.com/arthurcadore/syslog-appliance',
    },
    {
      title: 'pxe-appliance',
      description: 'A PXE boot server appliance using Docker.',
      url: 'https://github.com/arthurcadore/pxe-appliance',
    },
    {
      title: 'tacacs-appliance',
      description: 'A TACACS+ server appliance using Docker.',
      url: 'https://github.com/arthurcadore/tacacs-appliance',
    },
    {
      title: 'capacita-radius',
      description: 'A RADIUS server for training purposes.',
      url: 'https://github.com/arthurcadore/capacita-radius',
    },
    {
      title: 'ldap-appliance',
      description: 'An LDAP server appliance using Docker.',
      url: 'https://github.com/arthurcadore/ldap-appliance',
    },
    {
      title: 'netdump-appliance',
      description: 'A network dump and analysis appliance.',
      url: 'https://github.com/arthurcadore/netdump-appliance',
    },
    {
      title: 'speedtest-appliance',
      description: 'A self-hosted speedtest server appliance.',
      url: 'https://github.com/arthurcadore/speedtest-appliance',
    },
  ]

  const renderRepoCard = (repo: {
    title: string
    description: string
    url: string
    type?: string
  }) => {
    const [copied, setCopied] = useState(false)

    const getCommand = () => {
      if (repo.type === 'docker') {
        const imageName = repo.url.split('/').slice(-2).join('/')
        return `docker pull ${imageName}:latest`
      }
      return `git clone ${repo.url}.git`
    }

    const handleCopy = (e: React.MouseEvent) => {
      e.preventDefault()
      navigator.clipboard.writeText(getCommand())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <div
        key={repo.url}
        className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col justify-between h-full"
      >
        <div>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              {repo.type === 'docker' ? (
                <Dock size={20} />
              ) : (
                <Github size={20} />
              )}
              <span>{repo.title}</span>
            </h3>
          </a>
          <p className="text-gray-600 mb-4">{repo.description}</p>
        </div>
        <div className="mt-auto pt-4">
          <div className="bg-gray-800 text-white p-2 rounded-md flex justify-between items-center text-sm font-mono">
            <pre className="truncate">
              <code>{getCommand()}</code>
            </pre>
            <button
              onClick={handleCopy}
              className="p-1 text-gray-300 hover:text-white flex-shrink-0"
              aria-label="Copy command"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <main>
        <h1 className="text-4xl font-light text-green-700 mb-12">Software</h1>

        <section className="mb-16">
          <h2 className="text-3xl font-light mb-8">Academicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {academicos.map(renderRepoCard)}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-light mb-8">DevOps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devops.map(renderRepoCard)}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-light mb-8">Appliances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appliances.map(renderRepoCard)}
          </div>
        </section>
      </main>
    </div>
  )
}
