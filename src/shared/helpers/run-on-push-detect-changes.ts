import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

//retorna uma função que vai fazer a detecção global assíncronamente e vai ser usada nos componentes de método OnPush
export function runOnPushDetectChanges(
  fixture: ComponentFixture<unknown>
): Promise<void> {
  const detectChanges =
    fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  detectChanges.detectChanges();
  return fixture.whenStable();
}
