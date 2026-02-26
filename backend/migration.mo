import Map "mo:core/Map";

module {
  type WorkExperience = {
    position : Text;
    company : Text;
    startDate : Text;
    endDate : Text;
    description : Text;
  };

  type Education = {
    degree : Text;
    institution : Text;
    graduationYear : Text;
  };

  type Resume = {
    summary : Text;
    skills : [Text];
    workExperience : [WorkExperience];
    education : [Education];
  };

  type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    publicationDate : Int;
    tags : [Text];
  };

  type Memory = {
    id : Nat;
    title : Text;
    description : Text;
    imageUrl : Text;
  };

  type Article = {
    id : Nat;
    title : Text;
    content : Text;
    publicationDate : Int;
    coverImageUrl : ?Text;
  };

  type StudyMaterial = {
    id : Nat;
    title : Text;
    subject : Text;
    description : Text;
    content : Text;
  };

  type OldActor = {
    resume : ?Resume;
    nextBlogPostId : Nat;
    nextMemoryId : Nat;
    nextArticleId : Nat;
    nextStudyMaterialId : Nat;
    blogPosts : Map.Map<Nat, BlogPost>;
    memories : Map.Map<Nat, Memory>;
    articles : Map.Map<Nat, Article>;
    studyMaterials : Map.Map<Nat, StudyMaterial>;
  };

  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    let defaultResume : Resume = {
      summary = "IAS Officer Bhupesh Chaudhary is currently posted in Ladakh and has played a pivotal role in Project Ladakh. With a commitment to public service and significant contributions to administrative reforms and infrastructure development, Bhupesh continues to serve the nation with integrity and excellence.";
      skills = ["Public Administration", "Project Management", "Policy Implementation", "Infrastructure Development"];
      workExperience = [
        {
          position = "District Magistrate";
          company = "Administration of Ladakh";
          startDate = "March 2020";
          endDate = "Present";
          description = "Overseeing major initiatives and projects in the region.";
        },
      ];
      education = [
        {
          degree = "Master of Public Administration";
          institution = "Delhi University";
          graduationYear = "2008";
        },
      ];
    };
    let resume = switch (old.resume) {
      case (null) { ?defaultResume };
      case (?existing) { ?existing };
    };
    { old with resume };
  };
};
