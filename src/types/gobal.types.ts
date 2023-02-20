

export type TJasmineEnv = {
  describe?: (test:string, method:(...args:any[]) => any) => void
  addReporter?: (recorder:Record<string, any>) => any
}

export type TJasmine = {
  getEnv: () => TJasmineEnv
  [key: string]: any
}

export type TModule = {
  exports: Record<any, any>
}

export type TRequire = (loc:string) => any