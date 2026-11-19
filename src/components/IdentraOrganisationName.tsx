/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { truncateText } from '../identra/verifierSession';
import { IDENTRA_ORGANISATION_NAME_TRANSLATIONS, SAMPLE_ORGANISATION_IDS, type SampleOrganisationId } from '../translations/IdentraOrganisationNameTranslations';
import { getLocalizedRecord } from '../utils/i18nRuntime';

const isSampleOrganisation = (id: string): id is SampleOrganisationId => (SAMPLE_ORGANISATION_IDS as readonly string[]).includes(id);

/**
 * An organisation's name as the server (the trust list) gives it, as text, cut and isolated for
 * bidirectional display. A known sample organisation's name is translated only for other languages and
 * only while the server still gives exactly its Vietnamese sample name: a renamed organisation, or a
 * real one that reuses the identifier, shows what the server says.
 */
export default function IdentraOrganisationName({ maToChuc, serverName, language }: { maToChuc: string; serverName: string; language: string }) {
  const names = getLocalizedRecord(
    IDENTRA_ORGANISATION_NAME_TRANSLATIONS,
    language as keyof typeof IDENTRA_ORGANISATION_NAME_TRANSLATIONS,
    'IDENTRA_ORGANISATION_NAME_TRANSLATIONS',
  );
  const translated = isSampleOrganisation(maToChuc) && serverName === IDENTRA_ORGANISATION_NAME_TRANSLATIONS.vi[maToChuc];
  return <bdi>{translated ? names[maToChuc] : truncateText(serverName)}</bdi>;
}
