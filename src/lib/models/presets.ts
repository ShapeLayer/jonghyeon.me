export type CareersSectionTab = 'history' | 'projects';
export type CareerTagDisplayMode = 'always' | 'collapse' | 'hide';
/** Display mode per tag group: primary holds stack and project tags, secondary every other kind. */
export type CareerTagDisplayModes = { primary: CareerTagDisplayMode; secondary: CareerTagDisplayMode };
/**
 * Tag visibility inside detail popups, independent of the list's display modes.
 * `primary` and `secondary` toggle the same tag groups the list uses; `show` and `hide`
 * override them with tag kinds (e.g. 'ai', 'topic') or single tag identifiers (e.g. 'driven'),
 * a tag identifier outranking its kind.
 */
export type CareerDetailTagVisibility = {
	primary: boolean;
	secondary: boolean;
	show: string[];
	hide: string[];
};
export type VerticalSpacing = {
	marginTop?: string;
	marginBottom?: string;
	paddingTop?: string;
	paddingBottom?: string;
};

export type Preset = {
	disableHeroSection: boolean;
	disableProfileSection: boolean;
	disableCareersSection: boolean;
	disableIntroductionDiv: boolean;
	disableIntroductionSummaryDiv: boolean;
	disableIntroductionDescriptionDiv: boolean;
	disableIntroductionEmbedDiv: boolean;
	heroVerticalSpacing: VerticalSpacing;
	profileVerticalSpacing: VerticalSpacing;
	introductionVerticalSpacing: VerticalSpacing;
	careersVerticalSpacing: VerticalSpacing;
	footerVerticalSpacing: VerticalSpacing;
	hideFooterBadges: boolean;
	hideFooterLocaleSelector: boolean;
	hideFooterCopyright: boolean;
	enableIntroductionScrollAdjustment: boolean;
	introductionDescriptionMarginTop: string;
	hideProfileCareersHr: boolean;
	profileCareersHrMargin: string;
	hideCareersFooterHr: boolean;
	careersFooterHrMargin: string;
	shownIntroductionParagraphs: number[];
	hideProfileEmailLink: boolean;
	hideProfileGithubLink: boolean;
	hideProfileBlogLink: boolean;
	hideProfileInstagramLink: boolean;
	countRecentPostsEmbed: number;
	openCareersSectionTabOpened: CareersSectionTab;
	careerItemHiddenOverrides: Record<string, boolean>;
	careerTagDisplayModes: CareerTagDisplayModes;
	careerDetailTagVisibility: CareerDetailTagVisibility;
	popupTransitionDurationMs: number;
};

export const defaultPreset: Preset = {
	disableHeroSection: false,
	disableProfileSection: false,
	disableCareersSection: false,
	disableIntroductionDiv: false,
	disableIntroductionSummaryDiv: false,
	disableIntroductionDescriptionDiv: false,
	disableIntroductionEmbedDiv: false,
	heroVerticalSpacing: {},
	profileVerticalSpacing: {},
	introductionVerticalSpacing: {},
	careersVerticalSpacing: {},
	footerVerticalSpacing: {},
	hideFooterBadges: false,
	hideFooterLocaleSelector: false,
	hideFooterCopyright: false,
	enableIntroductionScrollAdjustment: true,
	introductionDescriptionMarginTop: '4em',
	hideProfileCareersHr: false,
	profileCareersHrMargin: '5rem auto',
	hideCareersFooterHr: false,
	careersFooterHrMargin: '5rem auto',
	shownIntroductionParagraphs: [0, 1, 2],
	hideProfileEmailLink: false,
	hideProfileGithubLink: false,
	hideProfileBlogLink: false,
	hideProfileInstagramLink: false,
	countRecentPostsEmbed: 5,
	openCareersSectionTabOpened: 'history',
	careerItemHiddenOverrides: {},
	careerTagDisplayModes: { primary: 'always', secondary: 'collapse' },
	careerDetailTagVisibility: { primary: true, secondary: true, show: [], hide: [] },
	popupTransitionDurationMs: 500
};

const presets: Record<string, Partial<Preset>> = {
	cv: {
		disableHeroSection: true,
		popupTransitionDurationMs: 250,
		hideFooterBadges: true,
		disableIntroductionEmbedDiv: true,
		introductionVerticalSpacing: { marginTop: '30px' },
		enableIntroductionScrollAdjustment: false,
		hideProfileCareersHr: true,
		hideCareersFooterHr: true,
		shownIntroductionParagraphs: [1],
		hideProfileInstagramLink: true,
		openCareersSectionTabOpened: 'projects',
		careerItemHiddenOverrides: {
			'project-gfm2polygon-statement': false,
			'works-typst-maintaining': true,
			'work-imagelab': true,
			'work-ielab': true,
			'work-cnu-ucc-working-scholarship': true
		},
		careerTagDisplayModes: { primary: 'always', secondary: 'hide' },
		careerDetailTagVisibility: { primary: true, secondary: false, show: ['ai'], hide: [] }
	}
};

export const resolvePreset = (identifier: string | null): Preset => ({
	...defaultPreset,
	...(identifier ? presets[identifier] : undefined)
});
