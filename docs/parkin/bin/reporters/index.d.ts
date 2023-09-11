import { L as TRunResults, l as TFailedErrorResult } from '../../test.types-4b97b6cd.js';
import '../../helpers.types-d0730a59.js';

type TFormatLine = {
    type: string;
    text: string;
    failed?: boolean;
    isFailed?: boolean;
    isParent?: boolean;
    isFeature?: boolean;
};

type TPrintResultOpts = {
    failedOnly?: boolean;
    steps?: boolean;
    rules?: boolean;
    features?: boolean;
    errorOnly?: boolean;
    stepParents?: boolean;
    throwOnFailed?: boolean;
    exitWithError?: boolean;
};
declare const CLIReporter: {
    tags: {
        root: {
            fail: string;
            pass: string;
            warn: string;
        };
        child: {
            fail: string;
            pass: string;
            warn: string;
        };
    };
    fail: (text: string) => string;
    pass: (text: string) => string;
    results: (results: TRunResults, opts?: TPrintResultOpts) => any;
    format: {
        format: (text: string, failed?: boolean, isFailed?: boolean) => string;
        line: (args: TFormatLine) => string;
        error: (failed: TFailedErrorResult) => string;
        child: (text: string, failed?: boolean, isFailed?: boolean) => string;
        parent: (text: string, failed?: boolean, isFailed?: boolean) => string;
        errors: (failedExps: TFailedErrorResult[]) => string;
    };
};

export { CLIReporter, TPrintResultOpts };
