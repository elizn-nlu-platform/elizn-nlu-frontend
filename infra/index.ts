import S3Orgin from "./resources/s3-origin";
import CloudFront from "./resources/cloudfront";

const s3Orgin = new S3Orgin();
new CloudFront(s3Orgin);
