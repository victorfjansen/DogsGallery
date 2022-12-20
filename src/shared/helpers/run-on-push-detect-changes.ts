import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export function runOnPushDetectChanges(
  fixture: ComponentFixture<unknown>
): Promise<void> {
  const detectChanges =
    fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  detectChanges.detectChanges();
  return fixture.whenStable();
}
