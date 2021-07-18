[![Deploy](https://get.pulumi.com/new/button.svg)](https://app.pulumi.com/new)

# Tanpa Server - Mengelola Multi Bahasa Pemrograman Google Cloud Function dengan TypeScript dan Pulumi

Ini adalah contoh _deployment_ "Hello World" Google Cloud Function dengan bahasa Python dan Go. Pulumi program di implementasi menggunakan TypeScript.

```bash
# Jika kamu mau inisiasi dari awal
$ pulumi new gcp-typescript

# Kalau clone dari repo
$ pulumi stack init testing
$ pulumi config set gcp:project <gcp-project-kalian>
$ pulumi config set gcp:region <gcp-region-kalian>

# Install Dependensi
$ npm install

# Preview and jalankan deployment
$ pulumi up
Previewing changes:
...
Performing changes:
...
Resources:
    + 8 created

Duration: 3m23s

Outputs:
    goEndpoint    : "https://<go-url-kalian>"
    pythonEndpoint: "https://<python-url-kalian>"

# Mari kita lihat hasilnya

$ curl https://<go-url-kalian>
"Hello World!"
$ curl https://<python-url-kalian>
"Hello World!"

# Hapus apps 
$ pulumi destroy
```
