import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DogViewModel } from 'src/shared';
import { Router } from '@angular/router';
import { APP_ROUTES, PageState } from '../../../../enums';

@Component({
  selector: 'home-dogs-showcase',
  templateUrl: './dogs-showcase.component.html',
  styleUrls: ['./dogs-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogsShowcaseComponent {
  // recebe propriedades via input property
  @Input() showcaseList: DogViewModel[];
  @Input() selectedDog: DogViewModel;
  @Input() state: PageState;

  pageState: typeof PageState;

  constructor(private router: Router) {
    // define valores pras intancias
    this.showcaseList = [];
    this.selectedDog = this.showcaseList[0] || [];
    this.pageState = PageState;
    this.state = PageState.LOADING;
  }

  // define o dog selecionado a partir da lista que já existe
  changeCurrentDog(index: number): void {
    this.selectedDog = this.showcaseList[index];
  }

  //navega pra outra rota
  navigateTo(): void {
    this.router.navigate([APP_ROUTES.ALL_DOGS]);
  }

  //cria o trackBy pra evitar renders desnecessárias no template
  dogTrackBy(_: unknown, dog: DogViewModel): string {
    return dog.name;
  }
}
