<?php

namespace Bestyear\UserBundle\Entity;

use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
    public function getUserWithSettings()
    {
      $qb = $this->createQueryBuilder('user')
                 ->join('user.userSettings', 'userSettings', 'WITH', 'userSettings.birthdaysMail = 1')
                 ->addSelect('userSettings');

      return $qb->getQuery()
                ->getResult();
    }
}