interface WebsiteOwnerInterface {
    name: string;
    email: string;
}

export interface WebsiteInterface {
    websiteId: string;
    name: string;
    url: string;
    description: string;
    sitekey: string;
    owner?: WebsiteOwnerInterface;
    createdAt?: Date;
    updatedAt?: Date;
}