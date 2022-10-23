export interface Item {
	id?:number;
	text:string;
	value:number;
	type:number;
	date:number,
	ico:number,
	receiptId:string,
	category?:Array<number>
}
