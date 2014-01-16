<?php

namespace Bestyear\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Entity\User as BaseUser;
use Symfony\Component\Validator\Constraints as Assert;
use Bestyear\UserBundle\Validator\Constraints as UserAssert;

/**
 * User
 *
 * @ORM\Table()
 * @ORM\Entity
 * @UserAssert\FieldsNotBlank
 */
class User extends BaseUser
{
    const BRANCHE_TC = 'TC';
    const BRANCHE_GB = 'GB';
    const BRANCHE_GI = 'GI';
    const BRANCHE_GM = 'GM';
    const BRANCHE_GP = 'GP';
    const BRANCHE_GSM = 'GSM';
    const BRANCHE_GSU = 'GSU';
    
    const GENDER_MALE = 'm';
    const GENDER_FEMALE = 'f';
    
    /**
    * @ORM\Id
    * @ORM\Column(type="integer")
    * @ORM\GeneratedValue(strategy="AUTO")     
    */
    protected $id;
    
    /**
     * @Assert\Length(min="8",max="8", exactMessage="La taille du login doit être de 8 caractères", groups={"Registration"})
     * @Assert\NotBlank(groups={"Registration"})
     */
    protected $username;
    
    /**
     * @ORM\Column(name="gender", type="string", length=1)
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     */
    protected $gender;
    
    /**
     * @ORM\Column(name="givenname", type="string", length=255)
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     */
    protected $givenname;
    
    /**
     * @ORM\Column(name="familyname", type="string", length=255)
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     */
    protected $familyname;
    
    /**
     * @ORM\Column(name="birthdate", type="date")
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     * @Assert\Date()
     */
    protected $birthdate;
    
    /**
     * @ORM\Column(name="TC", type="string", length=40)
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     */
    protected $TC;
    
    /**
     * @ORM\Column(name="studylevel", type="string", length=3)
     * @Assert\NotBlank(groups={"Registration", "Profile"})
     */
    protected $studylevel;
        
    /**
     * @ORM\Column(name="streetnumber1", type="string", length=15, nullable=true)
     */
    protected $streetnumber1;
        
    /**
     * @ORM\Column(name="street1", type="string", length=255, nullable=true)
     */
    protected $street1;
    
    /**
     * @ORM\Column(name="postcode1", type="string", length=5, nullable=true)
     * @Assert\Regex(pattern="#^[0-9]{5}$#", message="Format invalide (5 chiffres)", groups={"Registration", "Profile"})
     */
    protected $postcode1;
        
    /**
     * @ORM\Column(name="city1", type="string", length=255, nullable=true)
     */
    protected $city1;
      
    /**
     * @ORM\Column(name="addressmore1", type="string", length=255, nullable=true)
     */
    protected $addressmore1;
    
    /**
     * @ORM\Column(name="streetnumber2", type="string", length=15, nullable=true)
     */
    protected $streetnumber2;
        
    /**
     * @ORM\Column(name="street2", type="string", length=255, nullable=true)
     */
    protected $street2;
    
    /**
     * @ORM\Column(name="postcode2", type="string", length=5, nullable=true)
     * @Assert\Regex(pattern="#^[0-9]{5}$#", message="Format invalide (5 chiffres)", groups={"Registration", "Profile"})
     */
    protected $postcode2;
        
    /**
     * @ORM\Column(name="city2", type="string", length=255, nullable=true)
     */
    protected $city2;
        
    /**
     * @ORM\Column(name="addressmore2", type="string", length=255, nullable=true)
     */
    protected $addressmore2;
        
    /**
     * @ORM\Column(name="phone1", type="string", length=30, nullable=true)
     */
    protected $phone1;
        
    /**
     * @ORM\Column(name="phone2", type="string", length=30, nullable=true)
     */
    protected $phone2;
        
    /**
     * @ORM\Column(name="cellphone", type="string", length=30, nullable=true)
     */
    protected $cellphone;
    
    /**
     * @ORM\Column(name="emailoptional", type="string", length=255, nullable=true)
     * @Assert\Email(message = "Email invalide", groups={"Registration", "Profile"})
     */
    protected $emailoptional;
    
    /**
     * @ORM\Column(name="facebook", type="string", length=255, nullable=true)
     * @Assert\Regex(pattern="#^(https?:\/\/)?(www\.)?facebook\.com/[a-z.-1-9_]+$#", message="Format invalide", groups={"Registration", "Profile"})
     */
    protected $facebook;
    
    /**
     * @ORM\Column(name="twitter", type="string", length=255, nullable=true)
     * @Assert\Regex(pattern="#(https?:\/\/)?(www\.)?twitter\.com/[a-zA-Z.-1-9_]+$#", message="Format invalide", groups={"Registration", "Profile"})
     */
    protected $twitter;
        
    /**
     * @ORM\Column(name="tn05_job", type="string", length=255, nullable=true)
     */
    protected $tn05_job;
        
    /**
     * @ORM\Column(name="tn05_place", type="string", length=255, nullable=true)
     */
    protected $tn05_place;
        
    /**
     * @ORM\Column(name="tn07_job", type="string", length=255, nullable=true)
     */
    protected $tn07_job;
        
    /**
     * @ORM\Column(name="tn07_place", type="string", length=255, nullable=true)
     */
    protected $tn07_place; 
       
    /**
     * @ORM\Column(name="tn09_job", type="string", length=255, nullable=true)
     */
    protected $tn09_job;
    
    /**
     * @ORM\Column(name="tn09_place", type="string", length=255, nullable=true)
     */
    protected $tn09_place;
    
    /**
     * @ORM\Column(name="tn10_job", type="string", length=255, nullable=true)
     */
    protected $tn10_job;
    
    /**
     * @ORM\Column(name="tn10_place", type="string", length=255, nullable=true)
     */
    protected $tn10_place;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;
    
        return $this;
    }

    /**
     * Get username
     *
     * @return string 
     */
    public function getUsername()
    {
        return $this->username;
    }
    
    /**
     * Set gender
     *
     * @param string $gender
     * @return User
     */
    public function setGender($gender)
    {
        if (!in_array($gender, array(self::GENDER_MALE, self::GENDER_FEMALE))) {
            throw new \InvalidArgumentException("Genre invalide");
        }
        $this->gender = $gender;
    
        return $this;
    }

    /**
     * Get Gender
     *
     * @return string 
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set givenname
     *
     * @param string $givenname
     * @return User
     */
    public function setGivenname($givenname)
    {
        $this->givenname = $givenname;
    
        return $this;
    }

    /**
     * Get givenname
     *
     * @return string 
     */
    public function getGivenname()
    {
        return $this->givenname;
    }

    /**
     * Set familyname
     *
     * @param string $familyname
     * @return User
     */
    public function setFamilyname($familyname)
    {
        $this->familyname = $familyname;
    
        return $this;
    }

    /**
     * Get familyname
     *
     * @return string 
     */
    public function getFamilyname()
    {
        return $this->familyname;
    }

    /**
     * Set birthdate
     *
     * @param string $birthdate
     * @return \DateTime
     */
    public function setBirthdate($birthdate)
    {
        if ($birthdate instanceof \DateTime) {
            $this->birthdate = $birthdate;
        } else {
            $this->birthdate = new \DateTime($birthdate);
        }
        return $this;
    }

    /**
     * Get birthdate
     *
     * @return \DateTime 
     */
    public function getBirthdate()
    {
        return $this->birthdate;
    }

    /**
     * Set TC
     *
     * @param string $tC
     * @return User
     */
    public function setTC($tC)
    {
        if (!in_array($tC, array(self::BRANCHE_TC, self::BRANCHE_GB, self::BRANCHE_GI, self::BRANCHE_GM, self::BRANCHE_GP, self::BRANCHE_GSM, self::BRANCHE_GSU))) {
            throw new \InvalidArgumentException("Branche invalide");
        }
        $this->TC = $tC;
    
        return $this;
    }

    /**
     * Get TC
     *
     * @return string 
     */
    public function getTC()
    {
        return $this->TC;
    }

    /**
     * Set studylevel
     *
     * @param integer $studylevel
     * @return User
     */
    public function setStudylevel($studylevel)
    {
        $this->studylevel = $studylevel;
    
        return $this;
    }

    /**
     * Get studylevel
     *
     * @return integer 
     */
    public function getStudylevel()
    {
        return $this->studylevel;
    }

    /**
     * Set streetnumber1
     *
     * @param string $streetnumber1
     * @return User
     */
    public function setStreetnumber1($streetnumber1)
    {
        $this->streetnumber1 = $streetnumber1;
    
        return $this;
    }

    /**
     * Get streetnumber1
     *
     * @return string 
     */
    public function getStreetnumber1()
    {
        return $this->streetnumber1;
    }

    /**
     * Set street1
     *
     * @param string $street1
     * @return User
     */
    public function setStreet1($street1)
    {
        $this->street1 = $street1;
    
        return $this;
    }

    /**
     * Get street1
     *
     * @return string 
     */
    public function getStreet1()
    {
        return $this->street1;
    }

    /**
     * Set postcode1
     *
     * @param string $postcode1
     * @return User
     */
    public function setPostcode1($postcode1)
    {
        $this->postcode1 = $postcode1;
    
        return $this;
    }

    /**
     * Get postcode1
     *
     * @return string 
     */
    public function getPostcode1()
    {
        return $this->postcode1;
    }

    /**
     * Set city1
     *
     * @param string $city1
     * @return User
     */
    public function setCity1($city1)
    {
        $this->city1 = $city1;
    
        return $this;
    }

    /**
     * Get city1
     *
     * @return string 
     */
    public function getCity1()
    {
        return $this->city1;
    }
    
    /**
     * Set addressmore1
     *
     * @param string $addressmore1
     * @return User
     */
    public function setAddressmore1($addressmore1)
    {
        $this->addressmore1 = $addressmore1;

        return $this;
    }
    
    /**
     * Get addressmore1
     *
     * @return string 
     */
    public function getAddressmore1()
    {
        return $this->addressmore1;
    }

    /**
     * Set streetnumber2
     *
     * @param string $streetnumber2
     * @return User
     */
    public function setStreetnumber2($streetnumber2)
    {
        $this->streetnumber2 = $streetnumber2;
    
        return $this;
    }

    /**
     * Get streetnumber2
     *
     * @return string 
     */
    public function getStreetnumber2()
    {
        return $this->streetnumber2;
    }

    /**
     * Set street2
     *
     * @param string $street2
     * @return User
     */
    public function setStreet2($street2)
    {
        $this->street2 = $street2;
    
        return $this;
    }

    /**
     * Get street2
     *
     * @return string 
     */
    public function getStreet2()
    {
        return $this->street2;
    }

    /**
     * Set postcode2
     *
     * @param string $postcode2
     * @return User
     */
    public function setPostcode2($postcode2)
    {
        $this->postcode2 = $postcode2;
    
        return $this;
    }

    /**
     * Get postcode2
     *
     * @return string 
     */
    public function getPostcode2()
    {
        return $this->postcode2;
    }

    /**
     * Set city2
     *
     * @param string $city2
     * @return User
     */
    public function setCity2($city2)
    {
        $this->city2 = $city2;
    
        return $this;
    }

    /**
     * Get city2
     *
     * @return string 
     */
    public function getCity2()
    {
        return $this->city2;
    }

    /**
     * Set addressmore2
     *
     * @param string $addressmore2
     * @return User
     */
    public function setAddressmore2($addressmore2)
    {
        $this->addressmore2 = $addressmore2;

        return $this;
    }
    
    /**
     * Get addressmore2
     *
     * @return string 
     */
    public function getAddressmore2()
    {
        return $this->addressmore2;
    }
    
    /**
     * Set phone1
     *
     * @param string $phone1
     * @return User
     */
    public function setPhone1($phone1)
    {
        $this->phone1 = $phone1;
    
        return $this;
    }

    /**
     * Get phone1
     *
     * @return string 
     */
    public function getPhone1()
    {
        return $this->phone1;
    }

    /**
     * Set phone2
     *
     * @param string $phone2
     * @return User
     */
    public function setPhone2($phone2)
    {
        $this->phone2 = $phone2;
    
        return $this;
    }

    /**
     * Get phone2
     *
     * @return string 
     */
    public function getPhone2()
    {
        return $this->phone2;
    }

    /**
     * Set cellphone
     *
     * @param string $cellphone
     * @return User
     */
    public function setCellphone($cellphone)
    {
        $this->cellphone = $cellphone;
    
        return $this;
    }

    /**
     * Get cellphone
     *
     * @return string 
     */
    public function getCellphone()
    {
        return $this->cellphone;
    }

    /**
     * Set emailoptional
     *
     * @param string $emailoptional
     * @return User
     */
    public function setEmailoptional($emailoptional)
    {
        $this->emailoptional = $emailoptional;
    
        return $this;
    }

    /**
     * Get emailoptional
     *
     * @return string 
     */
    public function getEmailoptional()
    {
        return $this->emailoptional;
    }

    /**
     * Set facebook
     *
     * @param string $facebook
     * @return User
     */
    public function setFacebook($facebook)
    {
        $this->facebook = $facebook;
    
        return $this;
    }

    /**
     * Get facebook
     *
     * @return string 
     */
    public function getFacebook()
    {
        return $this->facebook;
    }

    /**
     * Set twitter
     *
     * @param string $twitter
     * @return User
     */
    public function setTwitter($twitter)
    {
        $this->twitter = $twitter;
    
        return $this;
    }

    /**
     * Get twitter
     *
     * @return string 
     */
    public function getTwitter()
    {
        return $this->twitter;
    }

    /**
     * Set tn05_job
     *
     * @param string $tn05Job
     * @return User
     */
    public function setTn05Job($tn05Job)
    {
        $this->tn05_job = $tn05Job;
    
        return $this;
    }

    /**
     * Get tn05_job
     *
     * @return string 
     */
    public function getTn05Job()
    {
        return $this->tn05_job;
    }

    /**
     * Set tn05_place
     *
     * @param string $tn05Place
     * @return User
     */
    public function setTn05Place($tn05Place)
    {
        $this->tn05_place = $tn05Place;
    
        return $this;
    }

    /**
     * Get tn05_place
     *
     * @return string 
     */
    public function getTn05Place()
    {
        return $this->tn05_place;
    }

    /**
     * Set tn07_job
     *
     * @param string $tn07Job
     * @return User
     */
    public function setTn07Job($tn07Job)
    {
        $this->tn07_job = $tn07Job;
    
        return $this;
    }

    /**
     * Get tn07_job
     *
     * @return string 
     */
    public function getTn07Job()
    {
        return $this->tn07_job;
    }

    /**
     * Set tn07_place
     *
     * @param string $tn07Place
     * @return User
     */
    public function setTn07Place($tn07Place)
    {
        $this->tn07_place = $tn07Place;
    
        return $this;
    }

    /**
     * Get tn07_place
     *
     * @return string 
     */
    public function getTn07Place()
    {
        return $this->tn07_place;
    }

    /**
     * Set tn09_job
     *
     * @param string $tn09Job
     * @return User
     */
    public function setTn09Job($tn09Job)
    {
        $this->tn09_job = $tn09Job;
    
        return $this;
    }

    /**
     * Get tn09_job
     *
     * @return string 
     */
    public function getTn09Job()
    {
        return $this->tn09_job;
    }

    /**
     * Set tn09_place
     *
     * @param string $tn09Place
     * @return User
     */
    public function setTn09Place($tn09Place)
    {
        $this->tn09_place = $tn09Place;
    
        return $this;
    }

    /**
     * Get tn09_place
     *
     * @return string 
     */
    public function getTn09Place()
    {
        return $this->tn09_place;
    }

    /**
     * Set tn10_job
     *
     * @param string $tn10Job
     * @return User
     */
    public function setTn10Job($tn10Job)
    {
        $this->tn10_job = $tn10Job;
    
        return $this;
    }

    /**
     * Get tn10_job
     *
     * @return string 
     */
    public function getTn10Job()
    {
        return $this->tn10_job;
    }

    /**
     * Set tn10_place
     *
     * @param string $tn10Place
     * @return User
     */
    public function setTn10Place($tn10Place)
    {
        $this->tn10_place = $tn10Place;
    
        return $this;
    }

    /**
     * Get tn10_place
     *
     * @return string 
     */
    public function getTn10Place()
    {
        return $this->tn10_place;
    }
}