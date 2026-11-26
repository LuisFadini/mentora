terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_ssh_key" "main" {
  name       = "public-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "digitalocean_droplet" "web" {
  name   = "mentora-droplet"
  image  = "debian-13-x64"
  region = "sfo2"
  size   = "s-1vcpu-2gb"

  ssh_keys = [digitalocean_ssh_key.main.fingerprint]

  ipv6       = false
  monitoring = true

  tags = ["opentofu", "debian"]
  
  user_data = templatefile("${path.module}/cloud-init.yaml.tftpl", {
    env_file_b64 = base64encode(file("${path.module}/.env"))
    compose_b64 = base64encode(file("${path.module}/compose.yaml"))
  })
}

resource "digitalocean_firewall" "web" {
  name        = "debian-web-firewall"
  droplet_ids = [digitalocean_droplet.web.id]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
    protocol         = "icmp"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "53"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "53"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "80"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "443"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

output "droplet_id" {
  value = digitalocean_droplet.web.id
}

output "ipv4_address" {
  value = digitalocean_droplet.web.ipv4_address
}

output "ssh_command" {
  value = "ssh root@${digitalocean_droplet.web.ipv4_address}"
}
