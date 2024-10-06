export interface Party {
    name:string;
    address?:string;
}

export interface Supplier extends Party {
    tradeName?: string; 
    taxId?: string; 
    phoneNumber?: string; 
    email?: string; 
    website?: string; 
    country?: string; 
    annualBillingUSD?: number; 
    lastEdited?: Date; 
  }


//OFAC Related Interfaces
export interface SanctionedPartyOFAC extends Party {
    type: PartyType;
    program: string;
    list: OFACListType;
    score: number;
}

export interface PartyType {
    string: 'Entity' | 'Individual';
}

export interface OFACListType {
    string: 'SDN' | 'Non-SDN';
}


//World Bank Listing Related Interfaces
export interface DebarredPartyWBG extends Party {
    country: string;
    fromDate: Date;
    toDate: Date;
    grounds: string;
}


//Offshore Leaks Related Interfaces
export interface OffshoreLeakParty {
    entity: string;
    jurisdiction: string;
    linkedTo: string;
    dataFrom: Date;
}    







