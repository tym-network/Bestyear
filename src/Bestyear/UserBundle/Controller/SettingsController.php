<?php

namespace Bestyear\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response as Reponse;
use Symfony\Component\HttpFoundation\Request;

class SettingsController extends Controller
{
    public function settingsAction(Request $request)
    {
        if ($this->get('security.context')->isGranted('ROLE_USER')) {
            $userSettings = $this->container->get('security.context')->getToken()->getUser()->getUserSettings();
            $form = $this->createFormBuilder($userSettings)
                ->add('birthdaysMail', null, array('required' => false))
                ->getForm();

            if ($request->getMethod() == 'POST') {
                $form->handleRequest($request);
                if ($form->isValid()) {
                    $em = $this->getDoctrine()->getManager();
                    $em->persist($userSettings);
                    $em->flush();

                    return $this->redirect($this->generateUrl('bestyear_change_settings_saved'));
                }
            }

            return $this->render('BestyearUserBundle:Settings:settings.html.twig', array('form' => $form->createView()));
        } else {
            return $this->render('BestyearMainBundle:Main:indexNotLogged.html.twig', array());
        }
    }
    
    public function settingsSavedAction()
    {
        return $this->render('BestyearUserBundle:Settings:settingsSaved.html.twig', array());
    }
}
