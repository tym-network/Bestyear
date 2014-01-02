<?php

namespace Bestyear\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response as Reponse;
use Symfony\Component\HttpFoundation\Request;

class PasswordResetController extends Controller
{
    public function passwordResetAction()
    {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            return $this->render('BestyearUserBundle:Resetting:passwordReset.html.twig', array());
        } else {
            return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
        }
    }
}
