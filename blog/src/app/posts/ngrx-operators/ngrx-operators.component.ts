import {
  BehaviorSubject,
  Observable,
  Subject,
  concatMap,
  delay,
  filter,
  finalize,
  from,
  interval,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';

@Component({
    selector: 'app-ngrx-operators',
    templateUrl: './ngrx-operators.component.html',
    styleUrls: ['./ngrx-operators.component.scss'],
    standalone: true,
    imports: [
        FlexModule,
        MatCard,
        MatToolbar,
        MatCardContent,
        MatDivider,
        MatCardActions,
        MatButton,
        NgIf,
        AsyncPipe,
    ],
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
    this.initializeTasks();
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

  public pendingTasks$ = new BehaviorSubject<number[]>([]);
  public finishedTasks$ = new BehaviorSubject<number[]>([]);
  public currentTasks$ = new BehaviorSubject<number[]>([]);
  public isProcessing$ = new BehaviorSubject<boolean>(false);

  public initializeTasks(): void {
    this.pendingTasks$.next([1, 2, 3, 4, 5]);
    this.finishedTasks$.next([]);
    this.currentTasks$.next([]);
  }

  public onApplyMergeMap(): void {
    this.isProcessing$.next(true);
    this.initializeTasks();
    this.pendingTasks$
      .pipe(
        take(1), // Take only the first emission of pendingTasks$
        delay(2000), // Delay before starting
        mergeMap((tasks) =>
          from(tasks).pipe(
            tap((id) => this.removePendingTask(id)),
            mergeMap((id) =>
              this.apiRequest(id, 2000 + Math.random() * 2000).pipe(
                // Added randomness to delay
                tap((id) => this.currentTaskStarted(id)),
                tap(() => this.taskFinished(id))
              )
            )
          )
        ),
        finalize(() => this.isProcessing$.next(false))
      )
      .subscribe();
  }

  public onApplyConcatMap(): void {
    this.isProcessing$.next(true);
    this.initializeTasks();
    this.pendingTasks$
      .pipe(
        take(1), // Take only the first emission of pendingTasks$
        delay(2000), // Delay before starting
        concatMap((tasks) =>
          from(tasks).pipe(
            concatMap((id) =>
              this.apiRequest(id, 2000).pipe(
                tap(() => this.currentTaskStarted(id)),
                tap(() => this.removePendingTask(id)),
                tap(() => this.taskFinished(id))
              )
            )
          )
        ),
        finalize(() => this.isProcessing$.next(false))
      )
      .subscribe();
  }

  private taskFinished(id: number): void {
    const finishedTasks = this.finishedTasks$.getValue();
    this.finishedTasks$.next([...finishedTasks, id]);

    const currentTasks = this.currentTasks$.getValue();
    this.currentTasks$.next(currentTasks.filter((task) => task !== id));
  }

  private apiRequest(id: number, delayTime: number): Observable<number> {
    this.currentTaskStarted(id);
    return of(id).pipe(
      delay(delayTime),
      tap(() => {
        this.currentTaskFinished(id);
      })
    );
  }

  private removePendingTask(id: number): void {
    const pendingTasks = this.pendingTasks$.getValue();
    this.pendingTasks$.next(pendingTasks.filter((task) => task !== id));
  }

  private currentTaskStarted(id: number): void {
    this.removePendingTask(id);
    const currentTasks = this.currentTasks$.getValue();
    this.currentTasks$.next([...currentTasks, id]);
  }

  private currentTaskFinished(id: number): void {
    const currentTasks = this.currentTasks$.getValue();
    this.currentTasks$.next(currentTasks.filter((task) => task !== id));
  }
}
