export interface BillItem {
	[key: string]: string | number | Array<{}>;
	
	billId:string,
	items:Array<itemOfBill>
}

export interface itemOfBill {
	itemType:string;
	name:string;
	price:number;
	quantity:number;
	vatRate:number;
}
