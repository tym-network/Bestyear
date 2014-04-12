<?php

namespace Bestyear\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserSettings
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class UserSettings
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var boolean
     *
     * @ORM\Column(name="birthdaysMail", type="boolean", nullable=false)
     */
    private $birthdaysMail = true;


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
     * Get birthdaysMail
     *
     * @return boolean
     */
    public function getBirthdaysMail()
    {
        return $this->birthdaysMail;
    }

    /**
     * Set birthdaysMail
     *
     * @param boolean $birthdaysMail
     * @return UserSettings
     */
    public function setBirthdaysMail($birthdaysMail)
    {
        $this->birthdaysMail = $birthdaysMail;
    
        return $this;
    }
}