import { ProcurementModule } from './procurement.module';

describe('ProcurementModule', () => {
  let procurementModule: ProcurementModule;

  beforeEach(() => {
    procurementModule = new ProcurementModule();
  });

  it('should create an instance', () => {
    expect(procurementModule).toBeTruthy();
  });
});
