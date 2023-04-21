export interface CRUD<T> {
	list: (limit: number, page: number) => Promise<T[] | any>;
	create: (resource: any) => Promise<T | any>;
	putById: (id: string, resource: any) => Promise<T | any>;
	readById: (id: string) => Promise<T | any>;
	deleteById: (id: string) => Promise<any>;
	patchById: (id: string, resource: any) => Promise<T | any>;
}
