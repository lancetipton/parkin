export enum EHookType {
  beforeAll=`beforeAll`,
  afterAll=`afterAll`,
  beforeEach=`beforeEach`,
  afterEach=`afterEach`
}

export enum EStepType {
  given=`given`,
  when=`when`,
  then=`then`,
  and=`and`,
  but=`but`,
  empty=``,
  "*"=`*`,
}

export enum EStepMethodType {
  Given=`Given`,
  When=`When`,
  Then=`Then`,
  And=`And`,
  But=`But`
}

export enum EAstObject {
  tags=`tags`,
  rule=`rule`,
  step=`step`,
  block=`block`,
  empty=`empty`,
  reason=`reason`,
  desire=`desire`,
  comment=`comment`,
  feature=`feature`,
  scenario=`scenario`,
  background=`background`,
  perspective=`perspective`,
}

export enum EFeatureTypes {
  feature = `Feature`,
  Feature = `Feature`,
  FEATURE = `Feature`,
  rule = `Rule`,
  Rule = `Rule`,
  background = `Background`,
  Background = `Background`,
  BACKGROUND = `Background`,
  scenario = `Scenario`,
  Scenario = `Scenario`,
  SCENARIO = `Scenario`,
  example = `Example`,
  Example = `Example`,
  EXAMPLE = `Example`,
  step = `Step`,
  Step = `Step`,
  RULE = `Rule`,
  STEP = `Step`
}

export type TAnyFunc = (...args:any[]) => any