export class Fashion{
    constructor(
        public _id:any=null,
        public IdF?: number,
        public slug?: string,
        public style:string="",
        public fashion_subject:string="",
        public fashion_detail:string="",
        public fashion_image:string="",
        public creation_date?: string | Date,
        public cosine?: number,
        public jaccard?: number,
        public similarity?: number){}
}
