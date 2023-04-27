# If it's the firt install of mkcert, run
mkcert -install

# Generate certificate for domain "docker.localhost", "domain.local" and their sub-domains
mkcert -cert-file local-cert.pem -key-file local-key.pem "docker.localhost" "*.docker.localhost" "domain.local" "*.domain.local"