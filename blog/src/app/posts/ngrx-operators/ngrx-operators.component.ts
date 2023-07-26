import { Component, OnInit } from '@angular/core';
import {
  Subject,
  filter,
  from,
  interval,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-ngrx-operators',
  templateUrl: './ngrx-operators.component.html',
  styleUrls: ['./ngrx-operators.component.scss'],
})
export class NgrxOperatorsComponent implements OnInit {
  data$ = of(['Angular', 'React', 'Vue', 'Svelte']);
  outputData: string[] = [];

  onApplyMap() {
    this.data$
      .pipe(
        tap((data) => (this.outputData = data.map((str) => str.toUpperCase())))
      )
      .subscribe();
  }

  filterNumbers$ = of([1, 2, 3, 4, 5]);
  filterOutputNumbers: number[] = [];
  onApplyFilter() {
    this.filterNumbers$
      .pipe(
        tap(
          (numbers) =>
            (this.filterOutputNumbers = numbers.filter((number) => number > 3))
        )
      )
      .subscribe();
  }

  numbers$ = of([1, 2, 3, 4, 5]);
  outputNumbers: number[] = [];

  onApplyMathOperation() {
    this.numbers$
      .pipe(
        map((numbers) => numbers.map((n) => n * 2)) // double each number
      )
      .subscribe((numbers) => (this.outputNumbers = numbers));
  }

  originalPipeData$ = of([1, 2, 3, 4, 5]); // original data observable
  pipeData$ = from([1, 2, 3, 4, 5]);
  pipeOutput: number[] = [];
  onApplyPipe() {
    this.pipeData$
      .pipe(
        filter((num) => num > 3),
        map((num) => num * 2)
      )
      .subscribe((val) => this.pipeOutput.push(val));
  }

  onApplyTap() {
    this.pipeData$
      .pipe(
        tap((n) => {
          if (n === 4) {
            alert(`Value ${n} is 4`);
          }
        })
      )
      .subscribe();
  }

  originalData = ['apple', 'banana', 'cherry'];
  dataOf$ = of(this.originalData);
  dataFrom$ = from(this.originalData);

  outputDataOf: any[] = [];
  fromQueue: string[] = [];

  onApplyOf() {
    this.dataOf$.subscribe((data) => {
      this.outputDataOf = data;
    });
  }

  onApplyFrom() {
    if (this.fromQueue.length === 0) {
      this.dataFrom$.subscribe((item) => {
        this.fromQueue.push(item);
      });
    }
    this.outputDataOf = [this.fromQueue.shift() || ''];
  }

  public switchMapData$ = new Subject<void>();
  public switchMapOutput: number | null = null;
  private stopTimer$ = new Subject<void>();

  ngOnInit() {
    this.switchMapData$
      .pipe(switchMap(() => interval(100).pipe(takeUntil(this.stopTimer$))))
      .subscribe(
        (val) => (this.switchMapOutput = val),
        (error) => console.error(error),
        () => (this.switchMapOutput = null)
      );
  }

  public onStopTimer(): void {
    this.stopTimer$.next();
    //this.switchMapOutput = null;
  }

  public onApplySwitchMap(): void {
    this.switchMapData$.next();
  }
}
