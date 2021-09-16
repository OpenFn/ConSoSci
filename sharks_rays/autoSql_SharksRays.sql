SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_surveytype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SurveyType (
        WCSPROGRAMS_SurveyTypeID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SurveyTypeName nvarchar(100)    NOT NULL, WCSPROGRAMS_SurveyTypeExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SurveyTypeCode nvarchar(255)    , WCSPROGRAMS_SurveyTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SurveyType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SurveyType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SurveyType CHECK CONSTRAINT FK_WCSPROGRAMS_SurveyType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SurveyType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SurveyType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SurveyType CHECK CONSTRAINT FK_WCSPROGRAMS_SurveyType_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_country'
          ORDER BY ordinal_position
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_district'
          ORDER BY ordinal_position
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_survey'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Survey (
        WCSPROGRAMS_SurveyID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SurveyName nvarchar(100)    NOT NULL, WCSPROGRAMS_SurveyExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SurveyCode nvarchar(255)    , WCSPROGRAMS_SurveyDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Survey WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Survey_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Survey CHECK CONSTRAINT FK_WCSPROGRAMS_Survey_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Survey WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Survey_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Survey CHECK CONSTRAINT FK_WCSPROGRAMS_Survey_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_landingsite'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_LandingSite (
        WCSPROGRAMS_LandingSiteID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_LandingSiteName nvarchar(100)    NOT NULL, WCSPROGRAMS_LandingSiteExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_LandingSiteCode nvarchar(255)    , WCSPROGRAMS_LandingSiteDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_LandingSite WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_LandingSite_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_LandingSite CHECK CONSTRAINT FK_WCSPROGRAMS_LandingSite_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_LandingSite WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_LandingSite_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_LandingSite CHECK CONSTRAINT FK_WCSPROGRAMS_LandingSite_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_market'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Market (
        WCSPROGRAMS_MarketID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_MarketName nvarchar(100)    NOT NULL, WCSPROGRAMS_MarketExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_MarketCode nvarchar(255)    , WCSPROGRAMS_MarketDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Market WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Market_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Market CHECK CONSTRAINT FK_WCSPROGRAMS_Market_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Market WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Market_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Market CHECK CONSTRAINT FK_WCSPROGRAMS_Market_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_surveyor'
          ORDER BY ordinal_position
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_boatinfo'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_BoatInfo (
        WCSPROGRAMS_BoatInfoID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_BoatInfoName nvarchar(100)    , WCSPROGRAMS_BoatInfoExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_BoatInfoCode nvarchar(255)    , WCSPROGRAMS_BoatInfoDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_BoatInfo WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_BoatInfo_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_BoatInfo CHECK CONSTRAINT FK_WCSPROGRAMS_BoatInfo_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_BoatInfo WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_BoatInfo_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_BoatInfo CHECK CONSTRAINT FK_WCSPROGRAMS_BoatInfo_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_boattype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_BoatType (
        WCSPROGRAMS_BoatTypeID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_BoatTypeName nvarchar(100)    NOT NULL, WCSPROGRAMS_BoatTypeExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_BoatTypeCode nvarchar(255)    , WCSPROGRAMS_BoatTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_BoatType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_BoatType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_BoatType CHECK CONSTRAINT FK_WCSPROGRAMS_BoatType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_BoatType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_BoatType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_BoatType CHECK CONSTRAINT FK_WCSPROGRAMS_BoatType_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_primarygear'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_PrimaryGear (
        WCSPROGRAMS_PrimaryGearID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_PrimaryGearName nvarchar(100)    , WCSPROGRAMS_PrimaryGearExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_PrimaryGearCode nvarchar(255)    , WCSPROGRAMS_PrimaryGearDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_PrimaryGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_PrimaryGear_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_PrimaryGear CHECK CONSTRAINT FK_WCSPROGRAMS_PrimaryGear_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_PrimaryGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_PrimaryGear_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_PrimaryGear CHECK CONSTRAINT FK_WCSPROGRAMS_PrimaryGear_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_primarymeshsizeunit'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_PrimaryMeshSizeUnit (
        WCSPROGRAMS_PrimaryMeshSizeUnitID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_PrimaryMeshSizeUnitName nvarchar(100)    , WCSPROGRAMS_PrimaryMeshSizeUnitExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_PrimaryMeshSizeUnitCode nvarchar(255)    , WCSPROGRAMS_PrimaryMeshSizeUnitDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_PrimaryMeshSizeUnit WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_PrimaryMeshSizeUnit_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_PrimaryMeshSizeUnit CHECK CONSTRAINT FK_WCSPROGRAMS_PrimaryMeshSizeUnit_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_PrimaryMeshSizeUnit WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_PrimaryMeshSizeUnit_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_PrimaryMeshSizeUnit CHECK CONSTRAINT FK_WCSPROGRAMS_PrimaryMeshSizeUnit_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_secondarygear'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SecondaryGear (
        WCSPROGRAMS_SecondaryGearID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SecondaryGearName nvarchar(100)    , WCSPROGRAMS_SecondaryGearExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SecondaryGearCode nvarchar(255)    , WCSPROGRAMS_SecondaryGearDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SecondaryGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SecondaryGear_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SecondaryGear CHECK CONSTRAINT FK_WCSPROGRAMS_SecondaryGear_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SecondaryGear WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SecondaryGear_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SecondaryGear CHECK CONSTRAINT FK_WCSPROGRAMS_SecondaryGear_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_secondarymeshsizeunit'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SecondaryMeshSizeUnit (
        WCSPROGRAMS_SecondaryMeshSizeUnitID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SecondaryMeshSizeUnitName nvarchar(100)    , WCSPROGRAMS_SecondaryMeshSizeUnitExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SecondaryMeshSizeUnitCode nvarchar(255)    , WCSPROGRAMS_SecondaryMeshSizeUnitDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SecondaryMeshSizeUnit WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SecondaryMeshSizeUnit_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SecondaryMeshSizeUnit CHECK CONSTRAINT FK_WCSPROGRAMS_SecondaryMeshSizeUnit_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SecondaryMeshSizeUnit WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SecondaryMeshSizeUnit_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SecondaryMeshSizeUnit CHECK CONSTRAINT FK_WCSPROGRAMS_SecondaryMeshSizeUnit_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_fishinghabitat'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_FishingHabitat (
        WCSPROGRAMS_FishingHabitatID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_FishingHabitatName nvarchar(100)    NOT NULL, WCSPROGRAMS_FishingHabitatExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_FishingHabitatCode nvarchar(255)    , WCSPROGRAMS_FishingHabitatDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_FishingHabitat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_FishingHabitat_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_FishingHabitat CHECK CONSTRAINT FK_WCSPROGRAMS_FishingHabitat_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_FishingHabitat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_FishingHabitat_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_FishingHabitat CHECK CONSTRAINT FK_WCSPROGRAMS_FishingHabitat_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_targeted'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Targeted (
        WCSPROGRAMS_TargetedID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_TargetedName nvarchar(100)    NOT NULL, WCSPROGRAMS_TargetedExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_TargetedCode nvarchar(255)    , WCSPROGRAMS_TargetedDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Targeted WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Targeted_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Targeted CHECK CONSTRAINT FK_WCSPROGRAMS_Targeted_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Targeted WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Targeted_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Targeted CHECK CONSTRAINT FK_WCSPROGRAMS_Targeted_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_releasesharkray'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_ReleaseSharkRay (
        WCSPROGRAMS_ReleaseSharkRayID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_ReleaseSharkRayName nvarchar(100)    NOT NULL, WCSPROGRAMS_ReleaseSharkRayExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_ReleaseSharkRayCode nvarchar(255)    , WCSPROGRAMS_ReleaseSharkRayDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_ReleaseSharkRay WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_ReleaseSharkRay_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_ReleaseSharkRay CHECK CONSTRAINT FK_WCSPROGRAMS_ReleaseSharkRay_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_ReleaseSharkRay WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_ReleaseSharkRay_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_ReleaseSharkRay CHECK CONSTRAINT FK_WCSPROGRAMS_ReleaseSharkRay_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_type'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Type (
        WCSPROGRAMS_TypeID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_TypeName nvarchar(100)    NOT NULL, WCSPROGRAMS_TypeExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_TypeCode nvarchar(255)    , WCSPROGRAMS_TypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Type WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Type_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Type CHECK CONSTRAINT FK_WCSPROGRAMS_Type_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Type WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Type_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Type CHECK CONSTRAINT FK_WCSPROGRAMS_Type_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_genus'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Genus (
        WCSPROGRAMS_GenusID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_GenusName nvarchar(100)    NOT NULL, WCSPROGRAMS_GenusExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_GenusCode nvarchar(255)    , WCSPROGRAMS_GenusDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Genus WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Genus_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Genus CHECK CONSTRAINT FK_WCSPROGRAMS_Genus_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Genus WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Genus_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Genus CHECK CONSTRAINT FK_WCSPROGRAMS_Genus_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_species'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Species (
        WCSPROGRAMS_SpeciesID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SpeciesName nvarchar(100)    , WCSPROGRAMS_SpeciesExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SpeciesCode nvarchar(255)    , WCSPROGRAMS_SpeciesDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Species WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Species_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Species CHECK CONSTRAINT FK_WCSPROGRAMS_Species_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Species WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Species_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Species CHECK CONSTRAINT FK_WCSPROGRAMS_Species_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sex'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_Sex (
        WCSPROGRAMS_SexID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SexName nvarchar(100)    NOT NULL, WCSPROGRAMS_SexExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SexCode nvarchar(255)    , WCSPROGRAMS_SexDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_Sex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Sex_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_Sex CHECK CONSTRAINT FK_WCSPROGRAMS_Sex_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_Sex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_Sex_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_Sex CHECK CONSTRAINT FK_WCSPROGRAMS_Sex_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_geartype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_GearType (
        WCSPROGRAMS_GearTypeID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_GearTypeName nvarchar(100)    NOT NULL, WCSPROGRAMS_GearTypeExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_GearTypeCode nvarchar(255)    , WCSPROGRAMS_GearTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_GearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_GearType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_GearType CHECK CONSTRAINT FK_WCSPROGRAMS_GearType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_GearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_GearType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_GearType CHECK CONSTRAINT FK_WCSPROGRAMS_GearType_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_dnasamplecollected'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_DnaSampleCollected (
        WCSPROGRAMS_DnaSampleCollectedID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_DnaSampleCollectedName nvarchar(100)    NOT NULL, WCSPROGRAMS_DnaSampleCollectedExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_DnaSampleCollectedCode nvarchar(255)    , WCSPROGRAMS_DnaSampleCollectedDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_DnaSampleCollected WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_DnaSampleCollected_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_DnaSampleCollected CHECK CONSTRAINT FK_WCSPROGRAMS_DnaSampleCollected_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_DnaSampleCollected WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_DnaSampleCollected_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_DnaSampleCollected CHECK CONSTRAINT FK_WCSPROGRAMS_DnaSampleCollected_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_fishspecie'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_FishSpecie (
        WCSPROGRAMS_FishSpecieID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_FishSpecieName nvarchar(100)    NOT NULL, WCSPROGRAMS_FishSpecieExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_FishSpecieCode nvarchar(255)    , WCSPROGRAMS_FishSpecieDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_FishSpecie WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_FishSpecie_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_FishSpecie CHECK CONSTRAINT FK_WCSPROGRAMS_FishSpecie_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_FishSpecie WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_FishSpecie_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_FishSpecie CHECK CONSTRAINT FK_WCSPROGRAMS_FishSpecie_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_vendorsex'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_VendorSex (
        WCSPROGRAMS_VendorSexID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_VendorSexName nvarchar(100)    NOT NULL, WCSPROGRAMS_VendorSexExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_VendorSexCode nvarchar(255)    , WCSPROGRAMS_VendorSexDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_VendorSex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_VendorSex_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_VendorSex CHECK CONSTRAINT FK_WCSPROGRAMS_VendorSex_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_VendorSex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_VendorSex_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_VendorSex CHECK CONSTRAINT FK_WCSPROGRAMS_VendorSex_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_wherebought'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_WhereBought (
        WCSPROGRAMS_WhereBoughtID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_WhereBoughtName nvarchar(100)    NOT NULL, WCSPROGRAMS_WhereBoughtExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_WhereBoughtCode nvarchar(255)    , WCSPROGRAMS_WhereBoughtDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_WhereBought WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_WhereBought_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_WhereBought CHECK CONSTRAINT FK_WCSPROGRAMS_WhereBought_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_WhereBought WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_WhereBought_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_WhereBought CHECK CONSTRAINT FK_WCSPROGRAMS_WhereBought_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_whosoldto'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_WhoSoldTo (
        WCSPROGRAMS_WhoSoldToID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_WhoSoldToName nvarchar(100)    NOT NULL, WCSPROGRAMS_WhoSoldToExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_WhoSoldToCode nvarchar(255)    , WCSPROGRAMS_WhoSoldToDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_WhoSoldTo WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_WhoSoldTo_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_WhoSoldTo CHECK CONSTRAINT FK_WCSPROGRAMS_WhoSoldTo_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_WhoSoldTo WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_WhoSoldTo_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_WhoSoldTo CHECK CONSTRAINT FK_WCSPROGRAMS_WhoSoldTo_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_stype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SType (
        WCSPROGRAMS_STypeID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_STypeName nvarchar(100)    NOT NULL, WCSPROGRAMS_STypeExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_STypeCode nvarchar(255)    , WCSPROGRAMS_STypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SType CHECK CONSTRAINT FK_WCSPROGRAMS_SType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SType CHECK CONSTRAINT FK_WCSPROGRAMS_SType_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sgenus'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SGenus (
        WCSPROGRAMS_SGenusID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SGenusName nvarchar(100)    NOT NULL, WCSPROGRAMS_SGenusExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SGenusCode nvarchar(255)    , WCSPROGRAMS_SGenusDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SGenus WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SGenus_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SGenus CHECK CONSTRAINT FK_WCSPROGRAMS_SGenus_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SGenus WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SGenus_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SGenus CHECK CONSTRAINT FK_WCSPROGRAMS_SGenus_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sspecies'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SSpecies (
        WCSPROGRAMS_SSpeciesID int   PRIMARY KEY IDENTITY (1,1) , WCSPROGRAMS_SSpeciesName nvarchar(100)    , WCSPROGRAMS_SSpeciesExtCode nvarchar(100)  UNIQUE  , WCSPROGRAMS_SSpeciesCode nvarchar(255)    , WCSPROGRAMS_SSpeciesDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SSpecies WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SSpecies_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SSpecies CHECK CONSTRAINT FK_WCSPROGRAMS_SSpecies_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SSpecies WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SSpecies_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SSpecies CHECK CONSTRAINT FK_WCSPROGRAMS_SSpecies_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_ssex'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SSex (
        WCSPROGRAMS_SSexID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SSexName nvarchar(100)    NOT NULL, WCSPROGRAMS_SSexExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SSexCode nvarchar(255)    , WCSPROGRAMS_SSexDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SSex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SSex_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SSex CHECK CONSTRAINT FK_WCSPROGRAMS_SSex_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SSex WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SSex_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SSex CHECK CONSTRAINT FK_WCSPROGRAMS_SSex_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sgeartype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SGearType (
        WCSPROGRAMS_SGearTypeID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SGearTypeName nvarchar(100)    NOT NULL, WCSPROGRAMS_SGearTypeExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SGearTypeCode nvarchar(255)    , WCSPROGRAMS_SGearTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SGearType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SGearType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SGearType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SGearType_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sdnasamplecollected'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SDnaSampleCollected (
        WCSPROGRAMS_SDnaSampleCollectedID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SDnaSampleCollectedName nvarchar(100)    NOT NULL, WCSPROGRAMS_SDnaSampleCollectedExtCode nvarchar(100)  UNIQUE  NOT NULL, WCSPROGRAMS_SDnaSampleCollectedCode nvarchar(255)    , WCSPROGRAMS_SDnaSampleCollectedDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SDnaSampleCollected WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SDnaSampleCollected_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SDnaSampleCollected CHECK CONSTRAINT FK_WCSPROGRAMS_SDnaSampleCollected_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SDnaSampleCollected WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SDnaSampleCollected_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SDnaSampleCollected CHECK CONSTRAINT FK_WCSPROGRAMS_SDnaSampleCollected_SecuritySettingID_Row;
                  
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_kobodataset'
          ORDER BY ordinal_position
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksrays'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRays (
        Verification nvarchar(max)    , SharkRayVendorsNb int    NOT NULL, Consent nvarchar(max)    , Pic3 nvarchar(max)    , Pic2 nvarchar(max)    , Pic1 nvarchar(max)    , WCSPROGRAMS_SurveyorID int    , WCSPROGRAMS_MarketID int    NOT NULL, WCSPROGRAMS_LandingSiteID int    NOT NULL, WCSPROGRAMS_SurveyID int    NOT NULL, WCSPROGRAMS_DistrictID int    NOT NULL, WCSPROGRAMS_CountryID int    NOT NULL, Gps nvarchar(max)    , WCSPROGRAMS_SurveyTypeID int    NOT NULL, Deviceid nvarchar(max)    , FormDateEnd date    , Start date    , Today date    , Latitude float    , Longitude float    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , Payload nvarchar(max)    , WCSPROGRAMS_SharksRaysID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SharksRaysName nvarchar(255)    , WCSPROGRAMS_SharksRaysExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SharksRaysCode nvarchar(255)    , WCSPROGRAMS_SharksRaysDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveyorID FOREIGN KEY (WCSPROGRAMS_SurveyorID)
                        REFERENCES WCSPROGRAMS_Surveyor (WCSPROGRAMS_SurveyorID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveyorID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_MarketID FOREIGN KEY (WCSPROGRAMS_MarketID)
                        REFERENCES WCSPROGRAMS_Market (WCSPROGRAMS_MarketID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_MarketID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_LandingSiteID FOREIGN KEY (WCSPROGRAMS_LandingSiteID)
                        REFERENCES WCSPROGRAMS_LandingSite (WCSPROGRAMS_LandingSiteID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_LandingSiteID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveyID FOREIGN KEY (WCSPROGRAMS_SurveyID)
                        REFERENCES WCSPROGRAMS_Survey (WCSPROGRAMS_SurveyID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveyID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_DistrictID FOREIGN KEY (WCSPROGRAMS_DistrictID)
                        REFERENCES WCSPROGRAMS_District (WCSPROGRAMS_DistrictID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_DistrictID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_CountryID FOREIGN KEY (WCSPROGRAMS_CountryID)
                        REFERENCES WCSPROGRAMS_Country (WCSPROGRAMS_CountryID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_CountryID;
ALTER TABLE WCSPROGRAMS_SharksRays WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveyTypeID FOREIGN KEY (WCSPROGRAMS_SurveyTypeID)
                        REFERENCES WCSPROGRAMS_SurveyType (WCSPROGRAMS_SurveyTypeID);
                        ALTER TABLE WCSPROGRAMS_SharksRays CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRays_WCSPROGRAMS_SurveyTypeID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksrayssales'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysSales (
        WCSPROGRAMS_STypeID int    NOT NULL, WCSPROGRAMS_SGenusID int    NOT NULL, WCSPROGRAMS_SSpeciesID int    , SPic4 nvarchar(max)    NOT NULL, SPic5 nvarchar(max)    NOT NULL, SPic6 nvarchar(max)    NOT NULL, SPic7 nvarchar(max)    NOT NULL, SPic8 nvarchar(max)    NOT NULL, SPic9 nvarchar(max)    NOT NULL, SPic10 nvarchar(max)    NOT NULL, SPic11 nvarchar(max)    NOT NULL, SPic12 nvarchar(max)    , SLocalName nvarchar(max)    NOT NULL, WCSPROGRAMS_SSexID int    NOT NULL, SWeight float    NOT NULL, SDiscWidth float    NOT NULL, SDiscLength float    NOT NULL, STotalLength float    NOT NULL, SPrecaudalLength float    NOT NULL, SForkLength float    NOT NULL, SCarapaceLength int    NOT NULL, SCarapaceWidth int    NOT NULL, SGearType nvarchar(max)    NOT NULL, SGearTypeOther nvarchar(max)    NOT NULL, WCSPROGRAMS_SDnaSampleCollectedID int    NOT NULL, SDnaCode nvarchar(max)    NOT NULL, SPriceSoldFor int    NOT NULL, SPriceSoldUsd nvarchar(100)    , SComment nvarchar(max)    , VendorUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_SalesID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SalesName nvarchar(255)    , WCSPROGRAMS_SalesExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SalesCode nvarchar(255)    , WCSPROGRAMS_SalesDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                        REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SharksRaysID;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_STypeID FOREIGN KEY (WCSPROGRAMS_STypeID)
                        REFERENCES WCSPROGRAMS_SType (WCSPROGRAMS_STypeID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_STypeID;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SGenusID FOREIGN KEY (WCSPROGRAMS_SGenusID)
                        REFERENCES WCSPROGRAMS_SGenus (WCSPROGRAMS_SGenusID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SGenusID;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SSpeciesID FOREIGN KEY (WCSPROGRAMS_SSpeciesID)
                        REFERENCES WCSPROGRAMS_SSpecies (WCSPROGRAMS_SSpeciesID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SSpeciesID;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SSexID FOREIGN KEY (WCSPROGRAMS_SSexID)
                        REFERENCES WCSPROGRAMS_SSex (WCSPROGRAMS_SSexID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SSexID;
ALTER TABLE WCSPROGRAMS_SharksRaysSales WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SDnaSampleCollectedID FOREIGN KEY (WCSPROGRAMS_SDnaSampleCollectedID)
                        REFERENCES WCSPROGRAMS_SDnaSampleCollected (WCSPROGRAMS_SDnaSampleCollectedID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSales CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSales_WCSPROGRAMS_SDnaSampleCollectedID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksraysvendor'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysVendor (
        WCSPROGRAMS_VendorSexID int    NOT NULL, WhenLastSellSharkRay nvarchar(max)    NOT NULL, WCSPROGRAMS_WhereBoughtID int    NOT NULL, WCSPROGRAMS_WhoSoldToID int    NOT NULL, WhoSoldOther nvarchar(max)    NOT NULL, SharksraysUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_VendorID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_VendorName nvarchar(255)    , WCSPROGRAMS_VendorExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_VendorCode nvarchar(255)    , WCSPROGRAMS_VendorDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                        REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_SharksRaysID;
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_VendorSexID FOREIGN KEY (WCSPROGRAMS_VendorSexID)
                        REFERENCES WCSPROGRAMS_VendorSex (WCSPROGRAMS_VendorSexID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_VendorSexID;
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_WhereBoughtID FOREIGN KEY (WCSPROGRAMS_WhereBoughtID)
                        REFERENCES WCSPROGRAMS_WhereBought (WCSPROGRAMS_WhereBoughtID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_WhereBoughtID;
ALTER TABLE WCSPROGRAMS_SharksRaysVendor WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_WhoSoldToID FOREIGN KEY (WCSPROGRAMS_WhoSoldToID)
                        REFERENCES WCSPROGRAMS_WhoSoldTo (WCSPROGRAMS_WhoSoldToID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysVendor CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysVendor_WCSPROGRAMS_WhoSoldToID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksrayssample'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysSample (
        FishLength float    , FishWeight float    , FishCatchUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_SampleID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_SampleName nvarchar(255)    , WCSPROGRAMS_SampleExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SampleCode nvarchar(255)    , WCSPROGRAMS_SampleDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysSample WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysSample CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysSample WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysSample CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysSample WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                        REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysSample CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysSample_WCSPROGRAMS_SharksRaysID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksraysfishcatch'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysFishCatch (
        WCSPROGRAMS_FishSpecieID int    NOT NULL, NbObserved int    NOT NULL, TotalWeightFish int    NOT NULL, FishPartConsumed int    NOT NULL, FishPriceKg int    NOT NULL, FishPriceSoldUsd nvarchar(100)    , BoatUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_FishCatchID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_FishCatchName nvarchar(255)    , WCSPROGRAMS_FishCatchExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_FishCatchCode nvarchar(255)    , WCSPROGRAMS_FishCatchDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                        REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_SharksRaysID;
ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_FishSpecieID FOREIGN KEY (WCSPROGRAMS_FishSpecieID)
                        REFERENCES WCSPROGRAMS_FishSpecie (WCSPROGRAMS_FishSpecieID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysFishCatch CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysFishCatch_WCSPROGRAMS_FishSpecieID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksrayscatchdetails'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysCatchDetails (
        WCSPROGRAMS_TypeID int    NOT NULL, WCSPROGRAMS_GenusID int    NOT NULL, WCSPROGRAMS_SpeciesID int    , LocalName nvarchar(max)    NOT NULL, WCSPROGRAMS_SexID int    NOT NULL, Weight float    NOT NULL, DiscWidth float    NOT NULL, DiscLength float    NOT NULL, TotalLength float    NOT NULL, ForkLength float    NOT NULL, PrecaudalLength float    NOT NULL, Pic4 nvarchar(max)    NOT NULL, Pic5 nvarchar(max)    NOT NULL, Pic6 nvarchar(max)    NOT NULL, Pic7 nvarchar(max)    NOT NULL, Pic8 nvarchar(max)    NOT NULL, Pic9 nvarchar(max)    NOT NULL, Pic10 nvarchar(max)    , Pic11 nvarchar(max)    , Pic12 nvarchar(max)    , GearType nvarchar(max)    NOT NULL, GearTypeOther nvarchar(max)    NOT NULL, WCSPROGRAMS_DnaSampleCollectedID int    NOT NULL, DnaCode nvarchar(max)    NOT NULL, PriceSoldFor int    NOT NULL, PriceSoldUsd nvarchar(100)    , Comment nvarchar(max)    , BoatUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_CatchDetailsID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_CatchDetailsName nvarchar(255)    , WCSPROGRAMS_CatchDetailsExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_CatchDetailsCode nvarchar(255)    , WCSPROGRAMS_CatchDetailsDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                        REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SharksRaysID;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_TypeID FOREIGN KEY (WCSPROGRAMS_TypeID)
                        REFERENCES WCSPROGRAMS_Type (WCSPROGRAMS_TypeID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_TypeID;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_GenusID FOREIGN KEY (WCSPROGRAMS_GenusID)
                        REFERENCES WCSPROGRAMS_Genus (WCSPROGRAMS_GenusID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_GenusID;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SpeciesID FOREIGN KEY (WCSPROGRAMS_SpeciesID)
                        REFERENCES WCSPROGRAMS_Species (WCSPROGRAMS_SpeciesID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SpeciesID;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SexID FOREIGN KEY (WCSPROGRAMS_SexID)
                        REFERENCES WCSPROGRAMS_Sex (WCSPROGRAMS_SexID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_SexID;
ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_DnaSampleCollectedID FOREIGN KEY (WCSPROGRAMS_DnaSampleCollectedID)
                        REFERENCES WCSPROGRAMS_DnaSampleCollected (WCSPROGRAMS_DnaSampleCollectedID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysCatchDetails CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysCatchDetails_WCSPROGRAMS_DnaSampleCollectedID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_sharksraysboat'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SharksRaysBoat (
        WCSPROGRAMS_BoatInfoID int    , WCSPROGRAMS_BoatTypeID int    NOT NULL, OtherBoat nvarchar(max)    NOT NULL, Crew int    NOT NULL, WomenCrew int    NOT NULL, Engine int    NOT NULL, WCSPROGRAMS_PrimaryGearID int    , PrimaryNetType nvarchar(max)    NOT NULL, PrimaryLineType nvarchar(max)    NOT NULL, PrimaryOtherType nvarchar(max)    NOT NULL, PrimaryGearLocalName nvarchar(max)    NOT NULL, PrimaryNetLength int    NOT NULL, PrimaryNetHeight int    NOT NULL, PrimaryMeshSize int    NOT NULL, WCSPROGRAMS_PrimaryMeshSizeUnitID int    , PrimaryLinesNb int    NOT NULL, PrimaryHooksNb int    NOT NULL, PrimaryHookSize nvarchar(max)    NOT NULL, WCSPROGRAMS_SecondaryGearID int    , SecondaryNetType nvarchar(max)    NOT NULL, SecondaryLineType nvarchar(max)    NOT NULL, SecondaryOtherType nvarchar(max)    NOT NULL, SecondaryGearLocalName nvarchar(max)    NOT NULL, SecondaryNetLength int    NOT NULL, SecondaryNetHeight int    NOT NULL, SecondaryMeshSize int    NOT NULL, WCSPROGRAMS_SecondaryMeshSizeUnitID int    , SecondaryLinesNb int    NOT NULL, SecondaryHooksNb int    NOT NULL, SecondaryHookSize nvarchar(max)    NOT NULL, FishingLocation nvarchar(max)    NOT NULL, FishingDepth int    NOT NULL, WCSPROGRAMS_FishingHabitatID int    NOT NULL, OtherHabitat nvarchar(max)    NOT NULL, DistanceSite nvarchar(max)    NOT NULL, FishingStart nvarchar(max)    , FishingEnd nvarchar(max)    , FishingTime int    , TravelTime int    NOT NULL, NbBoats int    NOT NULL, WCSPROGRAMS_TargetedID int    NOT NULL, LastCatchSharkRay nvarchar(max)    NOT NULL, WCSPROGRAMS_ReleaseSharkRayID int    NOT NULL, PercentEat int    NOT NULL, PercentSell int    NOT NULL, PercentGive int    NOT NULL, WhereSellFins nvarchar(max)    NOT NULL, WhereSellMeat nvarchar(max)    NOT NULL, WhereSellOil nvarchar(max)    NOT NULL, FinsPrice int    NOT NULL, FinsPriceUsd nvarchar(100)    , MeatPrice int    NOT NULL, MeatPriceUsd nvarchar(100)    , OilPrice int    NOT NULL, OilPriceUsd nvarchar(100)    , NbSharksUnsampled int    NOT NULL, NbRaysUnsampled int    NOT NULL, NbSharkLikeRaysUnsampled int    NOT NULL, SharksraysUuid nvarchar(max)    , AnswerId nvarchar(max)    , GeneratedUuid nvarchar(100)  UNIQUE  , WCSPROGRAMS_SharksRaysID int    , WCSPROGRAMS_BoatID int   PRIMARY KEY IDENTITY (1,1) NOT NULL, WCSPROGRAMS_BoatName nvarchar(255)    , WCSPROGRAMS_BoatExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_BoatCode nvarchar(255)    , WCSPROGRAMS_BoatDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysID FOREIGN KEY (WCSPROGRAMS_SharksRaysID)
                        REFERENCES WCSPROGRAMS_SharksRays (WCSPROGRAMS_SharksRaysID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SharksRaysID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_BoatInfoID FOREIGN KEY (WCSPROGRAMS_BoatInfoID)
                        REFERENCES WCSPROGRAMS_BoatInfo (WCSPROGRAMS_BoatInfoID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_BoatInfoID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_BoatTypeID FOREIGN KEY (WCSPROGRAMS_BoatTypeID)
                        REFERENCES WCSPROGRAMS_BoatType (WCSPROGRAMS_BoatTypeID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_BoatTypeID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_PrimaryGearID FOREIGN KEY (WCSPROGRAMS_PrimaryGearID)
                        REFERENCES WCSPROGRAMS_PrimaryGear (WCSPROGRAMS_PrimaryGearID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_PrimaryGearID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_PrimaryMeshSizeUnitID FOREIGN KEY (WCSPROGRAMS_PrimaryMeshSizeUnitID)
                        REFERENCES WCSPROGRAMS_PrimaryMeshSizeUnit (WCSPROGRAMS_PrimaryMeshSizeUnitID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_PrimaryMeshSizeUnitID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SecondaryGearID FOREIGN KEY (WCSPROGRAMS_SecondaryGearID)
                        REFERENCES WCSPROGRAMS_SecondaryGear (WCSPROGRAMS_SecondaryGearID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SecondaryGearID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SecondaryMeshSizeUnitID FOREIGN KEY (WCSPROGRAMS_SecondaryMeshSizeUnitID)
                        REFERENCES WCSPROGRAMS_SecondaryMeshSizeUnit (WCSPROGRAMS_SecondaryMeshSizeUnitID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_SecondaryMeshSizeUnitID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_FishingHabitatID FOREIGN KEY (WCSPROGRAMS_FishingHabitatID)
                        REFERENCES WCSPROGRAMS_FishingHabitat (WCSPROGRAMS_FishingHabitatID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_FishingHabitatID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_TargetedID FOREIGN KEY (WCSPROGRAMS_TargetedID)
                        REFERENCES WCSPROGRAMS_Targeted (WCSPROGRAMS_TargetedID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_TargetedID;
ALTER TABLE WCSPROGRAMS_SharksRaysBoat WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_ReleaseSharkRayID FOREIGN KEY (WCSPROGRAMS_ReleaseSharkRayID)
                        REFERENCES WCSPROGRAMS_ReleaseSharkRay (WCSPROGRAMS_ReleaseSharkRayID);
                        ALTER TABLE WCSPROGRAMS_SharksRaysBoat CHECK CONSTRAINT FK_WCSPROGRAMS_SharksRaysBoat_WCSPROGRAMS_ReleaseSharkRayID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_salessgeartype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_SalesSGearType (
        WCSPROGRAMS_SGearTypeID int    NOT NULL, WCSPROGRAMS_SalesID int    NOT NULL, WCSPROGRAMS_SGearTypeName nvarchar(255)    , WCSPROGRAMS_SGearTypeExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_SGearTypeCode nvarchar(255)    , WCSPROGRAMS_SGearTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_SalesSGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_SalesSGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_SalesSGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_SalesSGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_SalesSGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_WCSPROGRAMS_SGearTypeID FOREIGN KEY (WCSPROGRAMS_SGearTypeID)
                        REFERENCES WCSPROGRAMS_SGearType (WCSPROGRAMS_SGearTypeID);
                        ALTER TABLE WCSPROGRAMS_SalesSGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_WCSPROGRAMS_SGearTypeID;
ALTER TABLE WCSPROGRAMS_SalesSGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_WCSPROGRAMS_SalesID FOREIGN KEY (WCSPROGRAMS_SalesID)
                        REFERENCES WCSPROGRAMS_SharksRaysSales (WCSPROGRAMS_SalesID);
                        ALTER TABLE WCSPROGRAMS_SalesSGearType CHECK CONSTRAINT FK_WCSPROGRAMS_SalesSGearType_WCSPROGRAMS_SalesID;
                
SELECT column_name
          FROM information_schema.columns 
          WHERE table_name = 'wcsprograms_catchdetailsgeartype'
          ORDER BY ordinal_position
CREATE TABLE WCSPROGRAMS_CatchDetailsGearType (
        WCSPROGRAMS_GearTypeID int    NOT NULL, WCSPROGRAMS_CatchDetailsID int    NOT NULL, WCSPROGRAMS_GearTypeName nvarchar(255)    , WCSPROGRAMS_GearTypeExtCode nvarchar(50) DEFAULT ''   NOT NULL, WCSPROGRAMS_GearTypeCode nvarchar(255)    , WCSPROGRAMS_GearTypeDescription nvarchar(255)    , WCSPROGRAMS_OrganizationID_Owner int DEFAULT 1   NOT NULL, WCSPROGRAMS_SecuritySettingID_Row int DEFAULT 1   NOT NULL, Archive BIT DEFAULT 0   NOT NULL, IsPublic BIT DEFAULT 0   NOT NULL, CRDate datetime DEFAULT GETDATE()   NOT NULL, LMDate datetime DEFAULT GETDATE()   NOT NULL, UserID_CR int DEFAULT -1   NOT NULL, UserID_LM int DEFAULT -1   NOT NULL, CRIPAddress nvarchar(32) DEFAULT ''   NOT NULL, LMIPAddress nvarchar(32) DEFAULT ''   NOT NULL
      );
ALTER TABLE WCSPROGRAMS_CatchDetailsGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_OrganizationID_Owner FOREIGN KEY (WCSPROGRAMS_OrganizationID_Owner)
                  REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGearType CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_OrganizationID_Owner;
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_SecuritySettingID_Row FOREIGN KEY (WCSPROGRAMS_SecuritySettingID_Row)
                  REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGearType CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_SecuritySettingID_Row;
                  ALTER TABLE WCSPROGRAMS_CatchDetailsGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_WCSPROGRAMS_GearTypeID FOREIGN KEY (WCSPROGRAMS_GearTypeID)
                        REFERENCES WCSPROGRAMS_GearType (WCSPROGRAMS_GearTypeID);
                        ALTER TABLE WCSPROGRAMS_CatchDetailsGearType CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_WCSPROGRAMS_GearTypeID;
ALTER TABLE WCSPROGRAMS_CatchDetailsGearType WITH CHECK ADD CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_WCSPROGRAMS_CatchDetailsID FOREIGN KEY (WCSPROGRAMS_CatchDetailsID)
                        REFERENCES WCSPROGRAMS_SharksRaysCatchDetails (WCSPROGRAMS_CatchDetailsID);
                        ALTER TABLE WCSPROGRAMS_CatchDetailsGearType CHECK CONSTRAINT FK_WCSPROGRAMS_CatchDetailsGearType_WCSPROGRAMS_CatchDetailsID;