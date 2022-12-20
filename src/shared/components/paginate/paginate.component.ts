import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

//apresenta componente com o método OnPush para renderizar somente quando as propriedades de input forem alteradas
@Component({
  selector: 'paginate-component',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
//implementa o onChanges pra verificar todas as mudanças relativas a ele e renderizar quando houverem mudanças
export class PaginateComponent implements OnChanges {
  //declara instancias de entrada e saída
  @Input() current: number;
  @Input() total: number;

  @Output() changePageEvent: EventEmitter<number>;

  pages: number[] = [];

  constructor() {
    //declara valores default pra cada instancia
    this.current = 0;
    this.total = 0;
    this.pages = [];

    this.changePageEvent = new EventEmitter();
  }

  //ativa o ciclo de detecção pra quando houver mudança nas propriedades input ele recalcular a quantidade de páginas disponíveis
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['current'] && changes['current'].currentValue) ||
      (changes['total'] && changes['total'].currentValue)
    ) {
      this.pages = this.getPages(this.current, this.total);
    }
  }

  // logica pra conseguir pegar as paginas disponiveis a partir do numero total de paginas passadas e da pagina atual
  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }
}
