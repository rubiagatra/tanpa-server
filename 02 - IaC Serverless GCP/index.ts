import { asset } from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const bucket = new gcp.storage.Bucket("gcp-ts-serverless");

// Google Cloud Function  menggunakan Python

// Mempersiapkan GCS untuk menyimpan kode
const bucketObjectPython = new gcp.storage.BucketObject("python-zip", {
  bucket: bucket.name,
  source: new asset.AssetArchive({
    ".": new asset.FileArchive("./python-function"),
  }),
});

// Memebuat Service Cloud Function untuk Python
const functionPython = new gcp.cloudfunctions.Function("python-func", {
  sourceArchiveBucket: bucket.name,
  runtime: "python37",
  sourceArchiveObject: bucketObjectPython.name,
  entryPoint: "handler",
  triggerHttp: true,
  availableMemoryMb: 128,
});

// Konfigurasi Cloud Function untuk akses, project, dan region
const pyInvoker = new gcp.cloudfunctions.FunctionIamMember("py-invoker", {
  project: functionPython.project,
  region: functionPython.region,
  cloudFunction: functionPython.name,
  role: "roles/cloudfunctions.invoker",
  member: "allUsers",
});

export const pythonEndpoint = functionPython.httpsTriggerUrl;

// Google Cloud Function in Go

// Mempersiapkan GCS untuk menyimpan kode
const bucketObjectGo = new gcp.storage.BucketObject("go-zip", {
  bucket: bucket.name,
  source: new asset.AssetArchive({
    ".": new asset.FileArchive("./go-function"),
  }),
});

// Memebuat Service Cloud Function untuk Go
const functionGo = new gcp.cloudfunctions.Function("go-func", {
  sourceArchiveBucket: bucket.name,
  runtime: "go111",
  sourceArchiveObject: bucketObjectGo.name,
  entryPoint: "Handler",
  triggerHttp: true,
  availableMemoryMb: 128,
});

// Konfigurasi Cloud Function untuk akses, project, dan region
const goInvoker = new gcp.cloudfunctions.FunctionIamMember("go-invoker", {
  project: functionGo.project,
  region: functionGo.region,
  cloudFunction: functionGo.name,
  role: "roles/cloudfunctions.invoker",
  member: "allUsers",
});

export const goEndpoint = functionGo.httpsTriggerUrl;
