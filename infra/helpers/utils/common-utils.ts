import * as pulumi from "@pulumi/pulumi";

export function getResourceName(resourceIdentifier: string) {
    return `${pulumi.getProject()}-${pulumi.getStack()}-${resourceIdentifier}`;
}