<?php

namespace Bestyear\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response as Reponse;
use Symfony\Component\HttpFoundation\Request;

class PasswordChangedController extends Controller
{
    public function passwordChangedAction()
    {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            return $this->render('BestyearUserBundle:ChangePassword:passwordChanged.html.twig', array());
        } else {
            return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
        }
    }
}
