export default interface MemoryPostRequestBody{
    name:string;
    description:string;
    timestamp:Date|string;
    image?:string|null;
}
