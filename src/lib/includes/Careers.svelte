<script>
  import CareerAchievementCnuAlgorithmContest6th from '$lib/components/definitions/careers/CareerAchievementCnuAlgorithmContest6th.svelte';
  import CareerAchievementCnuStartup21 from '$lib/components/definitions/careers/CareerAchievementCnuStartup21.svelte';
  import CareerAchievementCnuSwClub24 from '$lib/components/definitions/careers/CareerAchievementCnuSwClub24.svelte';
  import CareerAchievementIcpc21 from '$lib/components/definitions/careers/CareerAchievementIcpc21.svelte';
  import CareerAchievementScholarshipMiraeAsset33 from '$lib/components/definitions/careers/CareerAchievementScholarshipMiraeAsset33.svelte';
  import CareerActivityCnuClubPimm from '$lib/components/definitions/careers/CareerActivityCnuClubPimm.svelte';
  import CareerActivityCnuClubStolio from '$lib/components/definitions/careers/CareerActivityCnuClubStolio.svelte';
  import CareerActivityGwangjuSwFestival19 from '$lib/components/definitions/careers/CareerActivityGwangjuSwFestival19.svelte';
  import CareerAlgorithmContestGist from '$lib/components/definitions/careers/CareerAlgorithmContestGist.svelte';
  import CareerAlgorithmContestPimm23 from '$lib/components/definitions/careers/CareerAlgorithmContestPimm23.svelte';
  import CareerAlgorithmContestPimm24a from '$lib/components/definitions/careers/CareerAlgorithmContestPimm24a.svelte';
  import CareerAlgorithmContestPimm24b from '$lib/components/definitions/careers/CareerAlgorithmContestPimm24b.svelte';
  import CareerAlgorithmContestPimm25a from '$lib/components/definitions/careers/CareerAlgorithmContestPimm25a.svelte';
  import CareerCertificationAwsCcp from '$lib/components/definitions/careers/CareerCertificationAwsCcp.svelte';
  import CareerCertificationAwsDa from '$lib/components/definitions/careers/CareerCertificationAwsDa.svelte';
  import CareerCertificationCosPro from '$lib/components/definitions/careers/CareerCertificationCosPro.svelte';
  import CareerCertificationJlpt from '$lib/components/definitions/careers/CareerCertificationJlpt.svelte';
  import CareerCertificationNetworkManager from '$lib/components/definitions/careers/CareerCertificationNetworkManager.svelte';
  import CareerCertificationSqld from '$lib/components/definitions/careers/CareerCertificationSqld.svelte';
  import CareerCertificationToeic from '$lib/components/definitions/careers/CareerCertificationToeic.svelte';
  import CareerCertificationTopcit from '$lib/components/definitions/careers/CareerCertificationTopcit.svelte';
  import CareerEduBachelorCnuCe from '$lib/components/definitions/careers/CareerEduBachelorCnuCe.svelte';
  import CareerEduBachelorExchangeSaga from '$lib/components/definitions/careers/CareerEduBachelorExchangeSaga.svelte';
  import CareerEduBachelorUnlvShortTerm from '$lib/components/definitions/careers/CareerEduBachelorUnlvShortTerm.svelte';
  import CareerEduHighSchoolSdok from '$lib/components/definitions/careers/CareerEduHighSchoolSdok.svelte';
  import CareerPaperSmartMedia21 from '$lib/components/definitions/careers/CareerPaperSmartMedia21.svelte';
  import CareerPaperSmartMedia22 from '$lib/components/definitions/careers/CareerPaperSmartMedia22.svelte';
  import CareerProjectHccc22Page from '$lib/components/definitions/careers/CareerProjectHccc22Page.svelte';
  import CareerProjectIwfcv22Page from '$lib/components/definitions/careers/CareerProjectIwfcv22Page.svelte';
  import CareerProjectPrefixGenerator from '$lib/components/definitions/careers/CareerProjectPrefixGenerator.svelte';
  import CareerProjectSignLanguageClient from '$lib/components/definitions/careers/CareerProjectSignLanguageClient.svelte';
  import CareerWorkCnuUccWorkingScholarship from '$lib/components/definitions/careers/CareerWorkCnuUccWorkingScholarship.svelte';
  import CareerWorkIeLab from '$lib/components/definitions/careers/CareerWorkIeLab.svelte';
  import CareerWorkImageLab from '$lib/components/definitions/careers/CareerWorkImageLab.svelte';
  import CareerWorkJamcodingLecturer from '$lib/components/definitions/careers/CareerWorkJamcodingLecturer.svelte';
  import CareerWorkRoka from '$lib/components/definitions/careers/CareerWorkRoka.svelte';
  import ExternalLink from '$lib/components/ExternalLink.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import { m } from '$lib/paraglide/messages';
</script>

<style>
  section.careers {
    display: flex;
    flex-direction: column;
    gap: 1.2em;
  }

  .last-update {
    font-size: .8em;
    font-style: italic;
  }
  
  ul.note {
    margin: .7em 0;
    padding-left: .5em;
  }
</style>

<section class="careers">
  <div class="careers-header">
    <SectionHeader>{m.careers()}</SectionHeader>
    <p class="last-update">{m.last_update({ date: '2025-07-19' })}</p>
    <ul>
      <li>{m.careers_page_link()}</li>
    </ul>
  </div>
  <div class="careers-content">
    <h3>CURRENT</h3>
    <CareerEduBachelorCnuCe />
    <CareerWorkJamcodingLecturer />
    <CareerWorkCnuUccWorkingScholarship />
    <CareerEduBachelorExchangeSaga />
    <CareerAchievementScholarshipMiraeAsset33 />
  </div>
  <div class="careers-content">
    <h3>EDUCATION</h3>
    <CareerEduHighSchoolSdok />
    <CareerEduBachelorUnlvShortTerm />
  </div>
  <div class="careers-content">
    <h3>WORK</h3>
    <CareerWorkImageLab />
    <CareerWorkRoka />
    <CareerWorkIeLab />
  </div>
  <div class="careers-content">
    <h3>PROJECTS</h3>
    <CareerProjectPrefixGenerator />
    <CareerProjectSignLanguageClient />
    <CareerProjectHccc22Page />
    <CareerProjectIwfcv22Page />
    <ul class="note">
      <li>
        {m.career_more_projects_github()}
        <ExternalLink href="https://github.com/ShapeLayer?tab=repositories">GitHub</ExternalLink>
      </li>
    </ul>
  </div>
  <div class="careers-content">
    <h3>ACHIEVEMENTS</h3>
    <CareerAchievementCnuStartup21 />
    <CareerAchievementIcpc21 />
    <CareerPaperSmartMedia21 />
    <CareerPaperSmartMedia22 />
    <CareerAchievementCnuAlgorithmContest6th />
    <CareerAchievementCnuSwClub24 />
  </div>
  <div class="careers-content">
    <h3>ACTIVITIES</h3>
    <CareerActivityGwangjuSwFestival19 />
    <CareerActivityCnuClubPimm />
    <CareerActivityCnuClubStolio />
  </div>
  <div class="careers-content">
    <h3>ACTIVITIES // ALGORITHM CONTEST</h3>
    <CareerAlgorithmContestPimm23 />
    <CareerAlgorithmContestPimm24a />
    <CareerAlgorithmContestGist />
    <CareerAlgorithmContestPimm24b />
    <CareerAlgorithmContestPimm25a />
  </div>
  <div class="careers-content">
    <h3>CERTIFICATIONS</h3>
    <CareerCertificationToeic />
    <CareerCertificationJlpt />
    <CareerCertificationSqld />
    <CareerCertificationAwsCcp />
    <CareerCertificationAwsDa />
    <CareerCertificationCosPro />
    <CareerCertificationNetworkManager />
    <CareerCertificationTopcit />
  </div>
</section>
