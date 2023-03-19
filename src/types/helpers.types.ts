export enum EHookType {
  beforeAll=`beforeAll`,
  afterAll=`afterAll`,
  beforeEach=`beforeEach`,
  afterEach=`afterEach`
}

export enum EStepType {
  step=`step`,
  given=`given`,
  when=`when`,
  then=`then`,
  and=`and`,
  but=`but`,
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
  rules=`rules`,
  step=`step`,
  steps=`steps`,
  block=`block`,
  blocks=`blocks`,
  empty=`empty`,
  reason=`reason`,
  desire=`desire`,
  comment=`comment`,
  comments=`comments`,
  feature=`feature`,
  scenario=`scenario`,
  scenarios=`scenarios`,
  background=`background`,
  perspective=`perspective`,

  given=`given`,
  when=`when`,
  then=`then`,
  and=`and`,
  but=`but`,
  "*"=`*`,
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
