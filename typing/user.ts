declare module 'user' {
  export interface TGSCDataItem {
    click: number;
    impression: number;
    ctr: number;
    position: number;
    date?: string;
    query?: string;
    page?: string;
    country?: string;
    device?: string;
  }

  export interface TGSCSourceCache {
    allPages: TGSCDataItem[] | string;
    donePages: number;
  }

  export interface TExpGscDataItem extends TGSCDataItem {
    groupId: string;
    groupName: string;
  }
}
