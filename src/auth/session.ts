import { Device } from "../services/utils/types/device.type";
import { UserType } from "../services/utils/types/user.type";

export type Session = {
	_id: string;
	userType: UserType;
	device: Device;
};
