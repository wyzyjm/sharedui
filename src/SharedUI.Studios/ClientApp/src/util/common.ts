import { Maybe } from './typeUtil'
import { FetchStatus } from '../models'

export class FetchStatusUtil {
    /**
     * Checks if the fetch operation had already completed, successful or not.
     * @param status The origin fetch status.
     * @returns A boolean value indicating if the operation had completed.
     */
    static isEnd(status: Maybe<FetchStatus>): boolean {
        return status === FetchStatus.Succeeded || status === FetchStatus.Failed;
    }

    /**
     * Checks if the fetch operation requires fetching (i.e. not started yet).
     * @param status The origin fetch status.
     * @returns A boolean value indicating whether the upstream action requires
     *          initiation.
     */
    static needFetch(status: Maybe<FetchStatus>): boolean {
        return !status || status === FetchStatus.NotStarted;
    }
}