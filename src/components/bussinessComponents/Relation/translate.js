import { TRANSLATE } from "@/services/api";
import _ from 'lodash'

export default {
  matter: matters   =>   TRANSLATE.matterTranslateUsingPOST({
    body:    matters,
  }),
  project: projects =>   TRANSLATE.declareProjectTranslateUsingPOST({
    body: projects,
  }),
  policyLibrary: policyIds =>  TRANSLATE.policyLibraryTranslateUsingPOST({
    body: policyIds,
  }),
  scene:  scenes =>  TRANSLATE.sceneTranslateUsingPOST({
    body: scenes,
  }),
  convenience:  conveniences =>  TRANSLATE.convenienceServiceTranslateUsingPOST({
    body: conveniences,
  }),
  article: articles => TRANSLATE.articleTranslateUsingPOST({
    body: articles,
  }),
}