/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Fragment, type ReactNode } from 'react';

/**
 * Fills `{name}` placeholders with React nodes, so a value from the API can be wrapped (for example in
 * `<bdi>`) inside a translated sentence instead of being concatenated as a string.
 */
export const fillNodes = (template: string, values: Record<string, ReactNode>): ReactNode[] =>
  template.split(/(\{\w+\})/).map((part, index) => {
    const placeholder = /^\{(\w+)\}$/.exec(part);
    return <Fragment key={index}>{placeholder ? values[placeholder[1]!] ?? '' : part}</Fragment>;
  });
