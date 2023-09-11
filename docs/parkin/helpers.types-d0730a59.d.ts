declare enum EHookType {
    beforeAll = "beforeAll",
    afterAll = "afterAll",
    beforeEach = "beforeEach",
    afterEach = "afterEach"
}
declare enum EStepType {
    step = "step",
    given = "given",
    when = "when",
    then = "then",
    and = "and",
    but = "but",
    "*" = "*"
}
declare enum EStepMethodType {
    Given = "Given",
    When = "When",
    Then = "Then",
    And = "And",
    But = "But",
    "*" = "*"
}
declare enum EAstObject {
    error = "error",
    tags = "tags",
    rule = "rule",
    rules = "rules",
    step = "step",
    steps = "steps",
    block = "block",
    blocks = "blocks",
    empty = "empty",
    reason = "reason",
    desire = "desire",
    comment = "comment",
    comments = "comments",
    feature = "feature",
    scenario = "scenario",
    scenarios = "scenarios",
    background = "background",
    perspective = "perspective",
    given = "given",
    when = "when",
    then = "then",
    and = "and",
    but = "but",
    "*" = "*",
    expression = "expression",
    expressions = "expressions"
}
declare enum EFeatureTypes {
    feature = "Feature",
    Feature = "Feature",
    FEATURE = "Feature",
    rule = "Rule",
    Rule = "Rule",
    background = "Background",
    Background = "Background",
    BACKGROUND = "Background",
    scenario = "Scenario",
    Scenario = "Scenario",
    SCENARIO = "Scenario",
    example = "Example",
    Example = "Example",
    EXAMPLE = "Example",
    step = "Step",
    Step = "Step",
    RULE = "Rule",
    STEP = "Step"
}
type TAnyFunc = (...args: any[]) => any;

export { EStepMethodType as E, TAnyFunc as T, EHookType as a, EStepType as b, EAstObject as c, EFeatureTypes as d };
