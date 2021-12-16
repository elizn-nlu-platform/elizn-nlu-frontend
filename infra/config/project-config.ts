import * as pulumi from "@pulumi/pulumi";

export interface DomainPropertiesType {
    bucketName: string;
    domainName: string;
    domainNamePrefix: string;
    hostedZoneId: string;
    acmCertificateArn: string;
}

export class ProjectConfig {
    private readonly _env: string;
    private readonly _projectName: string;
    private readonly _domainProperties: DomainPropertiesType;

    constructor() {
        this._env = pulumi.getStack();
        this._projectName =  pulumi.getProject();
        const projectConfig = new pulumi.Config("project");
        this._domainProperties = projectConfig.requireObject<DomainPropertiesType>("domainProperties");
    }

    public get env(): string {
        return this._env;
    }

    public get projectName(): string {
        return this._projectName;
    }

    public get domainProperties(): DomainPropertiesType {
        return this._domainProperties;
    }
}
