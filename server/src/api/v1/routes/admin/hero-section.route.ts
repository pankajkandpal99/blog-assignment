// import { Router } from "express";
// import { createApiHandler } from "../../../../utils/api-factory";
// import { HeroSectionController } from "../../controllers/admin/hero-section.controller";
// import { withFileUpload } from "../../../../utils/file-upload-utils";
// import { heroSectionSchema } from "../../../../schema/admin/heroSectionSchema";

// export default (router: Router) => {
//   router.post(
//     "/admin/home/hero-section",
//     createApiHandler(
//       HeroSectionController.createOrUpdateHeroSection,
//       withFileUpload(
//         {
//           requireAuth: true,
//           requireAdmin: true,
//           useTransaction: true,
//           bodySchema: heroSectionSchema,
//         },
//         "hero-section-image",
//         {
//           convertTextToJson: true,
//           validateBeforeAuth: false,
//           pathStructure: "home/hero",
//         }
//       )
//     )
//   );

//   router.get(
//     "/admin/home/hero-section",
//     createApiHandler(HeroSectionController.getHeroSection, {
//       requireAuth: false,
//       useTransaction: true,
//     })
//   );
// };
