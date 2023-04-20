import { Router } from 'express';
import passengerRoutes from './passengers/passenger.routes';
import mechantRoutes from './merchants/merchant.routes';
import adminRoutes from './admins/admin.routes';
import customerSupportRoutes from './customer-support/customer-support.routes';
import driverRoutes from './drivers/driver.routes';

const router = Router();

router.use('/passengers', passengerRoutes);
router.use('/merchants', mechantRoutes);
router.use('/admins', adminRoutes);
router.use('/curstomer-support', customerSupportRoutes);
router.use('/drivers', driverRoutes);

export default router;
