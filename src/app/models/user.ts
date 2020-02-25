import { Status } from './status.enum';

export interface User {
    id: number;
    name?: string;
    fname?: string;
    mname?: string
    status?: Status;
    lastUpdatedAt?: Date;
    avatar?: string;
    balance?: number;
}