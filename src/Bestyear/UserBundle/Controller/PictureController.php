<?php

namespace Bestyear\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class PictureController extends Controller
{
    public function indexAction() {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            return $this->render('BestyearUserBundle:Profile:delete.html.twig', array());
        } else {
            return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
        }
    }
}
