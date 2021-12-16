import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import {getResourceName} from "../helpers/utils/common-utils";
import {ProjectConfig, DomainPropertiesType} from "../config/project-config";
import S3Origin from "./s3-origin";

export default class CloudFront {
    private readonly _cloudfrontDistribution: aws.cloudfront.Distribution;
    constructor(s3Origin: S3Origin) {
        const projectConfig = new ProjectConfig();
        const domainProperties = projectConfig.domainProperties;
        const bucket = s3Origin.bucket;
        
        const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(getResourceName("frontend-oai"), {
            comment: "frontend-oai"
        });
        
        const s3OriginId = 'elizn-nlu-web';
        this._cloudfrontDistribution = new aws.cloudfront.Distribution(getResourceName("frontend-cd"), {
            aliases: [
                domainProperties.domainNamePrefix
            ],
            customErrorResponses: [
                {
                    errorCode: 403,
                    responsePagePath: "/index.html",
                    responseCode: 200,
                    errorCachingMinTtl: 300,
                },
                {
                    errorCode: 404,
                    responsePagePath: "/index.html",
                    responseCode: 200,
                    errorCachingMinTtl: 300,
                }
            ],
            viewerCertificate: {
                acmCertificateArn: domainProperties.acmCertificateArn,
                minimumProtocolVersion: 'TLSv1.1_2016',
                sslSupportMethod: 'sni-only'
            },
            comment: "Cloudfront distribution",
            defaultRootObject: "index.html",
            enabled: true,
            httpVersion: "http2",
            origins: [{
                originId: s3OriginId,
                domainName: bucket.bucketDomainName,
                s3OriginConfig: {
                    originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
                },
            }],
            defaultCacheBehavior: {
                compress: true,
                allowedMethods: [
                    "GET",
                    "HEAD",
                    "OPTIONS"
                ],
                forwardedValues: {
                    queryString: false,
                    cookies: {
                        forward: "none",
                    },
                },
                targetOriginId: s3OriginId,
                viewerProtocolPolicy: "redirect-to-https",
                // GET and HEAD methods are cached by default
                cachedMethods: [
                    "GET",
                    "HEAD",
                ]
            },
            restrictions: {
                geoRestriction: {
                    restrictionType: "none",
                    locations: [],
                },
            },
            tags: {
                env: projectConfig.env
            }
        });

        s3Origin.addBucketPolicy("s3-access", [{
            Effect: "Allow",
            Action: "s3:GetObject",
            Resource: `arn:aws:s3:::${domainProperties.bucketName}/*`,
            Principal: {
                AWS: originAccessIdentity.iamArn
            }
        }]);
    }
}