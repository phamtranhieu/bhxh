export interface GroupItemType {
	description: string;
	features: any;
	id: string;
	name: string;
	sortOrder: number;
}

export interface dataItem {
	createPermission: any;
	dataPermission: any;
	description: string;
	id: string;
	managerPermission: any;
	modifierPermission: any;
	name: string;
	sortOrder: number;
}

export interface ItemChildType {
	createPermission: any;
	dataPermission: any;
	description: string;
	id: string;
	managerPermission: any;
	modifierPermission: any;
	name: string;
	sortOrder: number;
}
export interface ItemConfig {
	displayText?: string;
	group: string;
	isFixed: boolean;
	isNotAllowedEditText: boolean;
	key: string;
	order: number;
	value: string;
}
