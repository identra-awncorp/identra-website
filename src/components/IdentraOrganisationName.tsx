/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { truncateText } from '../identra/verifierSession';
import { IDENTRA_ORGANISATION_NAME_TRANSLATIONS, SAMPLE_ORGANISATION_IDS, type SampleOrganisationId } from '../translations/IdentraOrganisationNameTranslations';
import { getLocalizedRecord } from '../utils/i18nRuntime';

const isSampleOrganisation = (id: string): id is SampleOrganisationId => (SAMPLE_ORGANISATION_IDS as readonly string[]).includes(id);

/**
 * An organisation's name: the localised name of a known sample organisation (looked up by `maToChuc`),
 * otherwise the name the server sent, as text, isolated for bidirectional display.
 */
export default function IdentraOrganisationName({ maToChuc, serverName, language }: { maToChuc: string; serverName: string; language: string }) {
  const names = getLocalizedRecord(
    IDENTRA_ORGANISATION_NAME_TRANSLATIONS,
    language as keyof typeof IDENTRA_ORGANISATION_NAME_TRANSLATIONS,
    'IDENTRA_ORGANISATION_NAME_TRANSLATIONS',
  );
  return <bdi>{isSampleOrganisation(maToChuc) ? names[maToChuc] : truncateText(serverName)}</bdi>;
}
