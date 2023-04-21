export interface CRUD<T> {
	list: (limit: number, page: number) => Promise<T[]>;
	create: (resource: any) => Promise<T>;
	putById: (id: string, resource: any) => Promise<T>;
	readById: (id: string) => Promise<T>;
	deleteById: (id: string) => Promise<string>;
	patchById: (id: string, resource: any) => Promise<T>;
}
