import List "mo:core/List";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Resume Types
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

  // Blog Types
  type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    publicationDate : Time.Time;
    tags : [Text];
  };

  module BlogPost {
    public func compareByDate(a : BlogPost, b : BlogPost) : Order.Order {
      Int.compare(b.publicationDate, a.publicationDate);
    };
  };

  // Memories Types
  type Memory = {
    id : Nat;
    title : Text;
    description : Text;
    imageUrl : Text;
  };

  // Article Types
  type Article = {
    id : Nat;
    title : Text;
    content : Text;
    publicationDate : Time.Time;
    coverImageUrl : ?Text;
  };

  module Article {
    public func compareByDate(a : Article, b : Article) : Order.Order {
      Int.compare(b.publicationDate, a.publicationDate);
    };
  };

  // Kids Study Material Types
  type StudyMaterial = {
    id : Nat;
    title : Text;
    subject : Text;
    description : Text;
    content : Text;
  };

  var resume : ?Resume = null;
  var nextBlogPostId = 0;
  var nextMemoryId = 0;
  var nextArticleId = 0;
  var nextStudyMaterialId = 0;

  let blogPosts = Map.empty<Nat, BlogPost>();
  let memories = Map.empty<Nat, Memory>();
  let articles = Map.empty<Nat, Article>();
  let studyMaterials = Map.empty<Nat, StudyMaterial>();

  // Resume Functions
  public shared ({ caller }) func updateResume(newResume : Resume) : async () {
    resume := ?newResume;
  };

  public query ({ caller }) func getResume() : async ?Resume {
    resume;
  };

  // Blog Functions
  public shared ({ caller }) func createBlogPost(title : Text, content : Text, tags : [Text]) : async BlogPost {
    let newPost : BlogPost = {
      id = nextBlogPostId;
      title;
      content;
      publicationDate = Time.now();
      tags;
    };
    blogPosts.add(nextBlogPostId, newPost);
    nextBlogPostId += 1;
    newPost;
  };

  public query ({ caller }) func getBlogPost(id : Nat) : async BlogPost {
    switch (blogPosts.get(id)) {
      case (null) { Runtime.trap("Blog post does not exist") };
      case (?post) { post };
    };
  };

  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort(BlogPost.compareByDate);
  };

  // Memories Functions
  public shared ({ caller }) func addMemory(title : Text, description : Text, imageUrl : Text) : async Memory {
    let newMemory : Memory = {
      id = nextMemoryId;
      title;
      description;
      imageUrl;
    };
    memories.add(nextMemoryId, newMemory);
    nextMemoryId += 1;
    newMemory;
  };

  public query ({ caller }) func getAllMemories() : async [Memory] {
    memories.values().toArray();
  };

  // Articles Functions
  public shared ({ caller }) func createArticle(title : Text, content : Text, coverImageUrl : ?Text) : async Article {
    let newArticle : Article = {
      id = nextArticleId;
      title;
      content;
      publicationDate = Time.now();
      coverImageUrl;
    };
    articles.add(nextArticleId, newArticle);
    nextArticleId += 1;
    newArticle;
  };

  public query ({ caller }) func getArticle(id : Nat) : async Article {
    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article does not exist") };
      case (?article) { article };
    };
  };

  public query ({ caller }) func getAllArticles() : async [Article] {
    articles.values().toArray().sort(Article.compareByDate);
  };

  // Study Materials Functions
  public shared ({ caller }) func addStudyMaterial(title : Text, subject : Text, description : Text, content : Text) : async StudyMaterial {
    let material : StudyMaterial = {
      id = nextStudyMaterialId;
      title;
      subject;
      description;
      content;
    };
    studyMaterials.add(nextStudyMaterialId, material);
    nextStudyMaterialId += 1;
    material;
  };

  public query ({ caller }) func getStudyMaterialsBySubject(subject : Text) : async [StudyMaterial] {
    let filtered = studyMaterials.values().toArray().filter(
      func(material) {
        Text.equal(material.subject, subject);
      }
    );
    filtered;
  };

  public query ({ caller }) func getAllStudyMaterials() : async [StudyMaterial] {
    studyMaterials.values().toArray();
  };
};
